const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/userModel');
const jwt = require('jsonwebtoken');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io')
require('dotenv').config();

const app = express();

const server = http.createServer(app);

const frontendPath = path.resolve(__dirname, '../frontend/dist');

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
});

// routes
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');
const categoryRoutes = require('./routes/categories');
const tradeRoutes = require('./routes/trades');
const reviewRoutes = require('./routes/reviews');
const messageRoutes = require('./routes/messages');

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

mongoose.connect(process.env.DB_URL)
    .then(res => server.listen(process.env.PORT))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(passport.initialize());

passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({ email })
        .then(async data => {
            if (!data) return done(null, false);
            if (await bcrypt.compare(password, data.password) == false) {
                return done(null, false);
            }
            return done(null, data);
        })
}))
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_CALLBACK
}, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails?.[0]?.value;
    const displayName = profile.displayName;
    const profile_img = profile.photos?.[0]?.value;

    // 1. Find existing user
    User.findOne({ email })
        .then(user => {
            if (user) {
                // Found existing user
                return done(null, user);
            }

            // 2. Create new user
            const newUser = new User({
                username: displayName,
                email,
                password: null,
                profile_img,
            });

            return newUser.save()
                .then(savedUser => done(null, savedUser))
                .catch(err => {
                    // 3. Handle duplicate username
                    if (err.code === 11000 && err.keyPattern?.username) {
                        const fallbackName =
                            email.split("@")[0].slice(0, 45) +
                            "-" +
                            Math.floor(Math.random() * 10000);

                        newUser.username = fallbackName;

                        return newUser.save()
                            .then(savedUser2 => done(null, savedUser2))
                            .catch(err2 => done(err2));
                    }

                    return done(err);
                });
        })
}));

io.use((socket, next) => {
    const token = socket.request.headers.cookie?.split('; ').find(c => c.startsWith('token='))?.split('=')[1];
    if (!token) return next(new Error('Unauthorized'));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        next();
    } catch (err) {
        next(new Error('Unauthorized'));
    }
});
const userSocketMap = {};

io.on('connection', (socket) => {
    const userId = socket.userId;
    if (!userSocketMap[userId]) userSocketMap[userId] = [];
    userSocketMap[userId].push(socket.id);
    console.log('User connected', userId, socket.id);

    socket.on('disconnect', () => {
        userSocketMap[userId] = userSocketMap[userId].filter(id => id !== socket.id);
        if (userSocketMap[userId].length === 0) delete userSocketMap[userId];
        console.log('User disconnected', socket.id);
    });
})

app.set('userSocketMap', userSocketMap);
app.set('io', io) //store in instance 

app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/category', categoryRoutes);
app.use('/trade', tradeRoutes);
app.use('/review', reviewRoutes);
app.use('/message', messageRoutes);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    })
}
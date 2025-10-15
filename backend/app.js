const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/userModel');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io')
require('dotenv').config();

const app = express();

console.log('hello')
console.log("client_callback:", process.env.client_callback);
console.log("client_url:", process.env.client_url);
console.log("NODE_ENV:", process.env.node_env);

const server = http.createServer(app);

const frontendPath = path.resolve(__dirname, '../frontend/dist');

const io = new Server(server, {
    cors: {
        origin: process.env.client_url,
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
    origin: process.env.client_url,
    credentials: true
}))

mongoose.connect(process.env.DB_URL)
    .then(res => server.listen(process.env.port))
    .catch(err => console.log(err));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const sessionMiddleware = session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //right now its localhost so false, true later if hosted
        sameSite: 'lax', //change to 'none' later when hosted
    }
});

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

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
    clientID: process.env.client_ID,
    clientSecret: process.env.client_secret,
    callbackURL: process.env.client_callback
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

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(result => done(null, result))
        .catch(err => console.log(err));
})
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});
const userSocketMap = {};

io.on('connection', (socket) => {
    const session = socket.request.session;

    if (!session || !session.passport || !session.passport.user) {
        console.log('Unauthenticated socket connection rejected');
        socket.disconnect();
        return;
    }

    const userId = session.passport.user.toString();

    if (!userSocketMap[userId]) {
        userSocketMap[userId] = [];
    }

    userSocketMap[userId].push(socket.id);
    console.log('this is user:', userId)
    console.log('user connected', socket.id);

    socket.on('disconnect', () => {
        userSocketMap[userId] = userSocketMap[userId].filter(id => id !== socket.id);
        if (userSocketMap[userId].length === 0) {
            delete userSocketMap[userId];
        }
        console.log('user disconnected', socket.id);
    })
})

app.set('userSocketMap', userSocketMap);
app.set('io', io) //store in instance 

app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/category', categoryRoutes);
app.use('/trade', tradeRoutes);
app.use('/review', reviewRoutes);
app.use('/message', messageRoutes);

if(process.env.node_env == 'production'){
    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    })
}
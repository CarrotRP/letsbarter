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
require('dotenv').config();

const app = express();

// routes
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');
const categoryRoutes = require('./routes/categories');
const tradeRoutes = require('./routes/trades');
const reviewRoutes = require('./routes/reviews');
const messageRoutes = require('./routes/messages');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

mongoose.connect(process.env.DB_URL)
    .then(res => app.listen(3000))
    .catch(err => console.log(err));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
}))

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
    User.findOne({ email})
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

app.get('/', (req, res) => {
    res.json('hello bruh')
})
app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/category', categoryRoutes);
app.use('/trade', tradeRoutes);
app.use('/review', reviewRoutes);
app.use('/message', messageRoutes);
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const user_check_auth = (req, res) => {
    const token = req.cookies?.token;
    if (!token) return res.json({ authenticated: false, redirect: '/login' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        User.findById(decoded.id).select('-password').then(user => {
            if (!user) return res.json({ authenticated: false, redirect: '/login' });
            res.json({ authenticated: true, redirect: '/', user });
        });
    } catch (err) {
        res.json({ authenticated: false, redirect: '/login' });
    }
}

const user_signup = async (req, res) => {
    const { username, password, occupation, email, phonenumber } = req.body;

    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);

    User.create({ username, password: hashedPw, occupation, email, phonenumber })
        .then(result => res.json({ result, redirect: '/login' }))
        .catch(err => {
            return res.json({ msg: 'err', error: err })
        })
}

const user_login = (req, res) => {
    const token = generateToken(req.user._id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ redirect: '/home', user: req.user });
}
const user_google_login = (req, res) => {
    const token = generateToken(req.user._id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    });
    res.send(`
      <script>
      const user = ${JSON.stringify(req.user)};

        window.opener.postMessage(
        { type: 'google-auth-success', user, redirect: '/home'},
        '${process.env.CLIENT_URL}'
        );

        window.close();
      </script>
    `);
}
const get_user = (req, res) => {
    const id = req.params.id;

    User.findById(id).select('-password').then(result => res.json(result));
}

const user_update = async (req, res) => {
    const id = req.params.id;
    const { username, occupation, email, password } = req.body;


    const profileImgPath = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const updateData = { username, occupation, email }

    if (profileImgPath) {
        updateData.profile_img = profileImgPath;
    }

    if (password) {
        const saltRounds = 10;
        const hashedPw = await bcrypt.hash(password, saltRounds);
        updateData.password = hashedPw;
    }

    User.findByIdAndUpdate(id, updateData, { new: true })
        .then(result => res.json(result))
        .catch(err => console.log(err));
}

const user_logout = (req, res) => {
    res.clearCookie('token');
    res.json({ redirect: '/login' });
}

module.exports = {
    user_check_auth,
    user_signup,
    user_login,
    user_google_login,
    user_update,
    get_user,
    user_logout
}
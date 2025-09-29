const User = require('../models/userModel');
const bcrypt = require('bcrypt');


const user_check_auth = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, redirect: '/', user: req.user });
    } else {
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
    res.json({ redirect: '/home', user: req.user });
}
const user_google_login = (req, res) => {
    console.log('hello');
    res.send(`
      <script>
        const user = ${JSON.stringify(req.user)};

        window.opener.postMessage(
        { type: 'google-auth-success', user, redirect: '/home'},
        'http://localhost:5173'
        );

        window.close();
      </script>
    `);
}
const get_user = (req, res) => {
    const id = req.params.id;
    
    User.findById(id).then(result => res.json(result));
}

const user_update = async (req, res) => {
    const id = req.params.id;
    const {username, occupation, email, password} = req.body;

    
    const profileImgPath = req.files['profile_img'] ? req.files['profile_img'][0].path.replace(/\\/g, '/') : null;
    console.log(req.files['profile_img']);
    console.log(profileImgPath);

    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);

    User.findByIdAndUpdate(id, {username, occupation, email, password: hashedPw, profile_img: profileImgPath}, {new: true})
    .then(result => res.json(result))
    .catch(err => console.log(err));
}

const user_logout = (req, res) => {
    req.logout((err) => {
        res.json({ redirect: '/login' });
    })
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
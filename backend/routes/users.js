const express = require('express');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');

const router = express.Router();

const userController = require('../controllers/userController');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_profiles', // your folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({storage});

router.get('/check-auth', userController.user_check_auth);
router.get('/oauth', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account', session: false}), userController.user_google_login)

router.post('/signup', userController.user_signup);
// router.post('/login', passport.authenticate('local', {session: false}), userController.user_login);
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if(err) return next(err);

    if(!user){
      return res.status(401).json({msg: info?.message || 'login failed'});
    }

    req.user = user;
    userController.user_login(req, res);
  })(req, res, next);
})
router.post('/logout', userController.user_logout);

router.get('/:id', userController.get_user);
router.patch('/:id', upload.single('profile_img'), userController.user_update);

module.exports = router;
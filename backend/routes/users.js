const express = require('express');
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const userController = require('../controllers/userController');

//multer storage
const storage = multer.diskStorage({
    destination: (req, file, done) => done(null, "uploads/"),
    filename: (req, file, done) => done(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({storage});

router.get('/check-auth', userController.user_check_auth);
router.get('/oauth', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }), userController.user_google_login)

router.post('/signup', userController.user_signup);
router.post('/login', passport.authenticate('local'), userController.user_login);
router.post('/logout', userController.user_logout);

router.get('/:id', userController.get_user);
router.patch('/:id', upload.fields([
    {name: 'profile_img', maxCount: 1}
]), userController.user_update);

module.exports = router;
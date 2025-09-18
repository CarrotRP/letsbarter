const express = require('express');
const passport = require('passport')

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/check-auth', userController.user_check_auth);
router.get('/:id', userController.get_user);
router.post('/signup', userController.user_signup);
router.post('/login', passport.authenticate('local'), userController.user_login);
router.post('/logout', userController.user_logout);
router.patch('/:id', userController.user_update);
router.get('/oauth', passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' }), userController.user_google_login)

module.exports = router;
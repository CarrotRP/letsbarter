const express = require('express');
const multer = require('multer');
const path = require('path');
const route = express.Router();

const messageController = require('../controllers/messageController');

//multer storage
const storage = multer.diskStorage({
    destination: (req, file, done) => done(null, "uploads/"),
    filename: (req, file, done) => done(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({storage});

//get all chat
route.get('/', messageController.get_chat);

//get all message
route.get('/:id', messageController.get_message);

//update read status
route.patch('/:id', messageController.update_read_status);

//send message
route.post('/send/:id', upload.single('image'), messageController.post_message);

module.exports = route;
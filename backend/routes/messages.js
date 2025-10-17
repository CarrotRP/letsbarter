const express = require('express');
const multer = require('multer');
const route = express.Router();
const authenticateJWT = require('../middleware/auth');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');

const messageController = require('../controllers/messageController');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'chat_images', // your folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({storage});

//get all chat
route.get('/', authenticateJWT, messageController.get_chat);

//get all message
route.get('/:id', authenticateJWT, messageController.get_message);

//update read status
route.patch('/:id', authenticateJWT, messageController.update_read_status);

//send message
route.post('/send/:id', authenticateJWT, upload.single('image'), messageController.post_message);

module.exports = route;
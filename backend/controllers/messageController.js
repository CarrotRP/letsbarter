const Message = require('../models/messageModel');
const User = require('../models/userModel');

const get_chat = (req, res) => {
    console.log(req.user)
    const userId = req.user._id;

    Message.find({
        $or: [{senderId: userId}, {receiverId: userId}]
    }).then(chat => {
        const partnerId = [...new Set(
            chat.map(c => c.senderId.toString() === userId.toString()
            ? c.receiverId.toString()
            : c.senderId.toString()
        ))]

        User.find({_id: {$in:partnerId}}).select('-password')
            .then(result => res.json(result));
    })
}

const get_message = (req, res) => {
    const {id} = req.params; //other user id
    const userId = req.user._id; //current logged in user

    Message.find({
        $or: [
            {receiverId: id, senderId: userId},
            {receiverId: userId, senderId: id}
        ]
    }).then(result => res.json(result));
}

const post_message = (req, res) => {
    const {text, image} = req.body;
    const {id} = req.params;
    const userId = req.user._id;

    const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;

    Message.create({senderId: userId, receiverId: id, text, image: imagePath})
        .then(result => res.json(result));
}

module.exports = {
    get_chat,
    get_message,
    post_message,
}
const Message = require('../models/messageModel');
const User = require('../models/userModel');

const get_chat = (req, res) => {
    const userId = req.user._id;

    Message.find({
        $or: [{ senderId: userId }, { receiverId: userId }]
    }).populate('receiverId', '_id username profile_img occupation')
        .populate('senderId', '_id username profile_img occupation')
        .sort({ createdAt: -1 })
        .then(chat => {
            const uniqueChatsMap = new Map();

            chat.forEach(c => {
                // Create a unique key that is independent of sender/receiver order
                const ids = [c.senderId._id.toString(), c.receiverId._id.toString()].sort();
                const key = ids.join('_');

                if (!uniqueChatsMap.has(key)) {
                    uniqueChatsMap.set(key, c);
                }
            });

            const uniqueChats = Array.from(uniqueChatsMap.values());
            res.json(uniqueChats);
        })
}

const get_message = (req, res) => {
    const { id } = req.params; //other user id
    const userId = req.user._id; //current logged in user

    Message.find({
        $or: [
            { receiverId: id, senderId: userId },
            { receiverId: userId, senderId: id }
        ]
    }).then(result => res.json(result));
}

const post_message = (req, res) => {
    const { text} = req.body;
    const { id } = req.params;
    const userId = req.user._id;
    const io = req.app.get('io');

    const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;

    Message.create({ senderId: userId, receiverId: id, text, image: imagePath })
        .then(result => {
            io.emit('new_message', message);
            res.json(result)
        });
}

module.exports = {
    get_chat,
    get_message,
    post_message,
}
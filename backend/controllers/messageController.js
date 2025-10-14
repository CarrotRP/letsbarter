const Message = require('../models/messageModel');
const User = require('../models/userModel');

const get_chat = (req, res) => {
    const userId = req.user._id;
    const { search } = req.query;

    Message.aggregate(
        [
            {
                $match: {
                    $or: [
                        { senderId: userId },
                        { receiverId: userId }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: "senderId",
                    foreignField: '_id',
                    as: 'sender'
                }
            },
            { $unwind: '$sender' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'receiverId',
                    foreignField: "_id",
                    as: "receiver"
                }
            },
            { $unwind: '$receiver' },
            ...(search ? [{
                $match: {
                    $or: [
                        { 'sender.username': { $regex: search, $options: 'i' } },
                        { 'receiver.username': { $regex: search, $options: 'i' } }
                    ]
                }
            }] : []),
            {
                $addFields: {
                    chatKey: {
                        $cond: [
                            { $lt: ['$sender._id', '$receiver._id'] },
                            {
                                $concat: [
                                    { $toString: '$sender._id' },
                                    '_',
                                    { $toString: '$receiver._id' }
                                ]
                            },
                            {
                                $concat: [
                                    { $toString: '$receiver._id' },
                                    '_',
                                    { $toString: '$sender._id' }
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: '$chatKey',
                    latestMessage: { $first: '$$ROOT' }
                }
            },
            {
                $replaceRoot: { newRoot: '$latestMessage' }
            },
            { $sort: { createdAt: -1 } },
            {
                $project: {
                    _id: 1,
                    text: 1,
                    image: 1,
                    createdAt: 1,
                    sender: {
                        _id: 1,
                        username: 1,
                        profile_img: 1,
                        occupation: 1
                    },
                    receiver: {
                        _id: 1,
                        username: 1,
                        profile_img: 1,
                        occupation: 1
                    },
                    isRead: 1
                }
            },
        ]
    ).then(chats => {
        res.json(chats);
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
    const { text } = req.body;
    const { id } = req.params; //receiverid or otheruser
    const userId = req.user._id; //senderId or current user
    const io = req.app.get('io');
    const userSocketMap = req.app.get('userSocketMap');

    console.log(text);

    const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;

    Message.create({ senderId: userId, receiverId: id, text, image: imagePath })
        .then(result => {
            const receiverSocketId = userSocketMap[id] || [];
            receiverSocketId.forEach(socketId => {
                io.to(socketId).emit('sendMessage', result);
            })
            const senderSockets = userSocketMap[userId] || [];
            senderSockets.forEach(socketId => {
                io.to(socketId).emit('sendMessage', result);
            })
            res.json(result)
        });
}
const update_read_status = (req, res) => {
    const { id } = req.params; //otheruser
    const userId = req.user._id;
    const io = req.app.get('io');
    const userSocketMap = req.app.get('userSocketMap');

    //message will only update when match these 3 conditions
    Message.updateMany(
        {
            senderId: id,
            receiverId: userId,
            isRead: false
        },
        {
            $set: { isRead: true }
        }).then(async result => {
            if(result.modifiedCount > 0){
                const updatedMessages = await Message.find({ senderId: id, receiverId: userId, isRead: true }).select('_id');
    
                const senderSockets = userSocketMap[id] || [];
                senderSockets.forEach(socketId => {
                    io.to(socketId).emit('readMessage', { messageIds: updatedMessages.map(m => m._id), receiverId: userId });
                });
    
                const currentUserSockets = userSocketMap[userId] || [];
                currentUserSockets.forEach(socketId => {
                    io.to(socketId).emit('readMessage', { messageIds: updatedMessages.map(m => m._id), receiverId: userId });
                });
            }

            res.json({ success: true, updatedCount: result.modifiedCount })
        });
}

module.exports = {
    get_chat,
    get_message,
    post_message,
    update_read_status
}
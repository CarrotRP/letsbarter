const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: String,
    image: String,
    isRead: { type: Boolean, default: false },
}, {timestamps: true})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
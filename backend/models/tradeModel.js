const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
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
    senderItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "Item"
        }
    ],
    receiverItems: [
        {
            type: Schema.Types.ObjectId,
            ref: "Item"
        }
    ],
    status: {
        type: String,
        enum: ["pending", "accepted", "declined", "cancelled", "countered"],
        default: "pending"
    },
    originalTradeId: {
        type: Schema.Types.ObjectId,
        ref: "Trade"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Trade = mongoose.model('Trade', tradeSchema);
module.exports = Trade;
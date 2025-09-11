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
    tradeType: {
        type: String,
        enum: ["offer", "incoming"]
    },
    status: {
        type: String,
        enum: ["accepted", "declined", "cancelled", "countered"]
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
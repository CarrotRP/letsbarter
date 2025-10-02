const Trade = require('../models/tradeModel');
const Item = require('../models/itemModel');

const get_sent_trade = (req, res) => {
    const { id } = req.params;

    Trade.find({ senderId: id })
        .populate('receiverId', 'username')
        .populate({
            path: 'senderItems',
            select: 'name main_img status looking_for item_condition'
        })
        .populate({
            path: 'receiverItems',
            select: 'name main_img status looking_for item_condition'
        })
        .then(result => {
            const formatted = result.map(r => ({
                _id: r._id,
                senderFirstItem: r.senderItems[0],
                senderItemCount: r.senderItems.length,
                receiverName: r.receiverId.username,
                receiverFirstItem: r.receiverItems[0],
                receiverItemCount: r.receiverItems.length,
                status: r.status,
            }))
            res.json(formatted)
        });
}

const get_receieved_trade = (req, res) => {
    const { id } = req.params;

        Trade.find({ receiverId: id })
        .populate('senderId', 'username')
        .populate({
            path: 'senderItems',
            select: 'name main_img status looking_for item_condition'
        })
        .populate({
            path: 'receiverItems',
            select: 'name main_img status looking_for item_condition'
        })
        .then(result => {
            const formatted = result.map(r => ({
                _id: r._id,
                senderName: r.senderId.username,
                senderFirstItem: r.senderItems[0],
                senderItemCount: r.senderItems.length,
                receiverFirstItem: r.receiverItems[0],
                receiverItemCount: r.receiverItems.length,
                status: r.status
            }))
            res.json(formatted)
        });
}

const get_one_trade = (req, res) => {
    const { id } = req.params;

    Trade.find({ _id: id })
        .then(result => res.json(result));
}

const send_trade = (req, res) => {
    const { senderItems, receiverItems, senderId, receiverId, status } = req.body;

    Trade.create({ senderId, receiverId, senderItems, receiverItems })
        .then(result => {
            Item.updateMany(
                { _id: { $in: [...senderItems, ...receiverItems] } },
                { $set: { status: "in-trade" } }
            ).then(() => {
                res.json(result)
            })
        });
}

module.exports = {
    get_sent_trade,
    get_receieved_trade,
    get_one_trade,
    send_trade
}
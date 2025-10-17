const Trade = require('../models/tradeModel');
const Item = require('../models/itemModel');

const get_sent_trade = (req, res) => {
    const { id } = req.params;
    const { page } = req.query;
    const limit = 4;

    let totalPage = 0;
    const skip = (page - 1) * limit;

    Trade.countDocuments({ senderId: id })
        .then(count => {
            totalPage = Math.ceil(count / limit);
            return Trade.find({ senderId: id })
                .populate('receiverId', 'username profile_img')
                .populate({
                    path: 'senderItems',
                    select: 'name main_img status looking_for item_condition'
                })
                .populate({
                    path: 'receiverItems',
                    select: 'name main_img status looking_for item_condition'
                }).sort({ updatedAt: -1 })
                .skip(skip)
                .limit(limit)
                .then(result => {

                    result.sort((a, b) => {
                        if (a.status === "pending" && b.status !== "pending") return -1; // a goes before b
                        if (a.status !== "pending" && b.status === "pending") return 1;  // b goes before a
                        return 0;
                    });
                    const formatted = result.map(r => ({
                        _id: r._id,
                        senderFirstItem: r.senderItems[0],
                        senderItemCount: r.senderItems.length,
                        senderItems: r.senderItems,
                        receiverId: r.receiverId,
                        receiverImg: r.receiverId.profile_img,
                        receiverName: r.receiverId.username,
                        receiverFirstItem: r.receiverItems[0],
                        receiverItemCount: r.receiverItems.length,
                        receiverItems: r.receiverItems,
                        status: r.status,
                        updatedAt: r.updatedAt
                    }))
                    res.json({ totalPage, formatted })
                });
        })
}

const get_received_trade = (req, res) => {
    const { id } = req.params;
    const { page } = req.query;
    const limit = 4;

    let totalPage = 0;
    const skip = (page - 1) * limit;

    Trade.countDocuments({ receiverId: id })
        .then(count => {
            totalPage = Math.ceil(count / limit);
            return Trade.find({ receiverId: id })
                .populate('senderId', 'username profile_img')
                .populate({
                    path: 'senderItems',
                    select: 'name main_img status looking_for item_condition'
                })
                .populate({
                    path: 'receiverItems',
                    select: 'name main_img status looking_for item_condition'
                }).sort({ updatedAt: -1 })
                .skip(skip)
                .limit(limit)
                .then(result => {

                    result.sort((a, b) => {
                        if (a.status === "pending" && b.status !== "pending") return -1; // a goes before b
                        if (a.status !== "pending" && b.status === "pending") return 1;  // b goes before a
                        return 0;
                    });
                    const formatted = result.map(r => ({
                        _id: r._id,
                        senderId: r.senderId,
                        senderImg: r.senderId.profile_img,
                        senderName: r.senderId.username,
                        senderFirstItem: r.senderItems[0],
                        senderItemCount: r.senderItems.length,
                        senderItems: r.senderItems,
                        receiverFirstItem: r.receiverItems[0],
                        receiverItemCount: r.receiverItems.length,
                        receiverItems: r.receiverItems,
                        status: r.status,
                        updatedAt: r.updatedAt
                    }))
                    res.json({ totalPage, formatted })
                });
        })
}

const get_one_trade = (req, res) => {
    const { id } = req.params;

    Trade.findOne({ _id: id })
        .then(result => res.json(result));
}

const send_trade = (req, res) => {
    const { senderItems, receiverItems, senderId, receiverId } = req.body;

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
const update_trade = (req, res) => {
    const { status, senderItems, receiverItems } = req.body;
    const { id } = req.params;

    const updateData = {}

    if (status) updateData.status = status;
    if (senderItems) updateData.senderItems = senderItems;
    if (receiverItems) updateData.receiverItems = receiverItems;

    Trade.findByIdAndUpdate(id, updateData, { new: true })
        .then(result => {
            if (status == 'cancelled' || status == 'declined' || status == 'countered') {
                const allItems = [...result.senderItems, ...result.receiverItems];
                return Item.updateMany(
                    { _id: { $in: allItems } },
                    { $set: { status: 'available' } }
                ).then(() => res.json(result));
            } else if (status == 'accepted') {
                const allItems = [...result.senderItems, ...result.receiverItems];
                return Item.updateMany(
                    { _id: { $in: allItems } },
                    { $set: { status: 'traded' } }
                ).then(() => res.json(result));
            }
            return res.json(result)
        });
}

module.exports = {
    get_sent_trade,
    get_received_trade,
    get_one_trade,
    send_trade,
    update_trade
}
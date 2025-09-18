const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    original_price: {
        type: Number,
        required: true
    },
    bought_on: Date,
    item_condition: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    looking_for: {
        type: String,
        required: true
    },
    imgs: {
        type: [String],
        // required: true
    },
    main_img: {
        type: String,
        // required: true
    },
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    status: {
        type: String,
        enum: ["available", "traded"],
        default: "available"
    }
}, { timestamps: true })

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
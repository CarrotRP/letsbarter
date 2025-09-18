const Item = require('../models/itemModel');

const get_all_items = (req, res) => {
    Item.find()
        .then(result => res.json(result));
}
const get_one_item = (req, res) => {
    const id = req.params.id;

    Item.findById(id).populate("owner_id", "username occupation")
    .then(result => res.json(result));
}
const get_item_for_owner = (req, res) => {
    const id = req.params.id;
    Item.findById(id)
        .then(result => res.json(result));
}
const upload_item = (req, res) => {
    const {
        name,
        description,
        original_price,
        bought_on,
        item_condition,
        looking_for,
        owner_id,
    } = req.body;

    const imgPaths = req.files['images'] ? req.files['images'].map(file => file.path.replace(/\\/g, '/')) : [];
    const mainImgPath = req.files['main_img'] ? req.files['main_img'][0].path.replace(/\\/g, '/') : null;

    Item.create({
        name, description, original_price, bought_on, item_condition,
        looking_for, imgs: imgPaths, main_img: mainImgPath, owner_id
    }).then(result => res.json(result))
}

module.exports = {
    get_all_items,
    get_one_item,
    upload_item,
    get_item_for_owner
}
const Item = require('../models/itemModel');

//get every item
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
    const user_id = req.params.id;

    Item.find({ owner_id: user_id })
        .then(result => res.json(result));
}

const get_by_category = (req, res) => {
    const category = req.query.category;

    Item.find({ category_id: category })
        .then(result => res.json(result));
}
const upload_item = (req, res) => {
    const {
        name,
        category,
        description,
        brand,
        original_price,
        bought_on,
        item_condition,
        looking_for,
        owner_id,
    } = req.body;

    const imgPaths = req.files['images'] ? req.files['images'].map(file => file.path.replace(/\\/g, '/')) : [];
    const mainImgPath = req.files['main_img'] ? req.files['main_img'][0].path.replace(/\\/g, '/') : null;

    console.log(imgPaths, mainImgPath);

    console.log('files', req.files);
    Item.create({
        name, category_id: category, description, brand, original_price, bought_on, item_condition,
        looking_for, imgs: imgPaths, main_img: mainImgPath, owner_id
    }).then(result => res.json(result))
}

const delete_item = (req, res) => {
    const id = req.params.id;

    Item.findByIdAndDelete(id)
        .then(result => res.json(result));
}
const update_item = async (req, res) => {
  const id = req.params.id;

  try {
    const {
      name,
      category,
      description,
      brand,
      original_price,
      bought_on,
      item_condition,
      looking_for,
      owner_id,
      existing_images // sent from frontend for images user wants to keep
    } = req.body;

    // Start building the update object
    const updateData = {
      name,
      category_id: category,
      description,
      brand,
      original_price,
      bought_on,
      item_condition,
      looking_for,
      owner_id,
    };

    // --- KEEP THIS EXACTLY AS YOUR ORIGINAL SNIPPET ---
    let imgPaths = [];
    console.log(existing_images);
    if (existing_images) {
      imgPaths = Array.isArray(existing_images)
        ? existing_images
        : [existing_images];
    }

    if (req.files && req.files['images']) {
      imgPaths.push(...req.files['images'].map(f => f.path.replace(/\\/g, '/')));
    }

    updateData.imgs = imgPaths;

    if (req.files && req.files['main_img']) {
      updateData.main_img = req.files['main_img'][0].path.replace(/\\/g, '/');
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedItem);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    get_all_items,
    get_one_item,
    get_by_category,
    upload_item,
    get_item_for_owner,
    delete_item,
    update_item
}
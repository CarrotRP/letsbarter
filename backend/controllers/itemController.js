const Item = require('../models/itemModel');

//get every item
const get_all_items = (req, res) => {
  const { limit, condition, sortOpt} = req.query;

  let totalCount = 0;
  
  const filter = {}
  let sort = {}

  if(condition) { filter.item_condition = { $gte: 7 }}
  if(sortOpt) {sort = {createdAt: -1}}
  
  Item.countDocuments(filter)
    .then(count => {
      totalCount = count;
      return Item.find(filter).limit(limit).sort(sort);
    })
    .then(items => res.json({count: totalCount, items}));
}
//in detail page
const get_one_item = (req, res) => {
  const id = req.params.id;

  Item.findById(id).populate("owner_id", "username occupation profile_img")
    .then(result => res.json(result));
}
//user own inventory
const get_item_for_owner = (req, res) => {
  const user_id = req.params.id;
  const { limit, filterOpt, page, query } = req.query;
  let skip = 0;

  const filter = {}

  let totalCount = 0;

  if(filterOpt){
    filter._id = { $ne: filterOpt}
  }

  if(query){
    filter.name = { $regex: query, $options: 'i'}
  }

  if(page){
    skip = (page - 1) * limit;
  }

  Item.countDocuments({owner_id: user_id, ...filter})
    .then(count => {
      //totalCount, if its in home or detail, do the 'see more'(dont use pagination navigator), else(popup) do the pagination navigator
      totalCount = page ? Math.ceil(count / limit) : count;
      return Item.find({ owner_id: user_id, ...filter}).limit(limit).skip(skip);
    }).then(items => res.json({count: totalCount, items}));
}
//get item by category
const get_by_category = (req, res) => {
  const { category, condition, sortOpt, page, limitOpt, filterOpt} = req.query;

  const limit = limitOpt ? limitOpt : 2; //for testing
  const skip = (page - 1) * limit;
  let totalPage = 0;

  const filter = {};

  if(category){
    filter.category_id = category;
  }
  //if theres filterOpt req(detail page), add this filter
  if(filterOpt){
    filter._id = { $ne: filterOpt}
  }

  if(condition == 'lt'){
    filter.item_condition = { $lte: 5};
  } else if(condition == 'gt'){
    filter.item_condition = { $gte: 5};
  }

  let sort = {}
  if(sortOpt == 'asc'){
    sort = { estimate_value: 1}
  } else if(sortOpt == 'desc'){
    sort = {estimate_value: -1};
  }
  Item.countDocuments(filter)
    .then(count => {
      //if theres limit option req('see more' button), then send back the total item count instead not the page
      totalPage = limitOpt ? count : Math.ceil(count / limit);
      return Item.find(filter).sort(sort).skip(skip).limit(limit);
    }).then(items => res.json({totalPage, items}));
}
//search item
const search_item = (req, res) => {
  const { query, condition, sortOpt, page } = req.query;
  const limit = 2; //2 for now, for testing
  const skip = (page - 1) * limit;

  const filter = {};

  if(query){
    filter.name = { $regex: query, $options: "i"};
  }

  //filter item condition
  //less than or equal 5
  if(condition == 'lt'){
    filter.item_condition = { $lte: 5};
  }
  //more than or equal 5
  if(condition == 'gt'){
    filter.item_condition = { $gte: 5}
  }

  const sort = {};

  //sort item value estimate
  if(sortOpt == 'asc'){
    sort.option = {estimate_value: 1};
  }
  if(sortOpt == 'desc'){
    sort.option = {estimate_value: -1};
  }

  let totalPage = 0;

  Item.countDocuments(filter)
    .then(count => {
      totalPage = Math.ceil(count / limit);
      return Item.find(filter).sort(sort).skip(skip).limit(limit);
    })
    .then(items => res.json({totalPage, items}));

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
    estimate_value
  } = req.body;

  const imgPaths = req.files['images'] ? req.files['images'].map(file => file.path.replace(/\\/g, '/')) : [];
  const mainImgPath = req.files['main_img'] ? req.files['main_img'][0].path.replace(/\\/g, '/') : null;

  Item.create({
    name, category_id: category, description, brand, original_price, bought_on, item_condition,
    looking_for, imgs: imgPaths, main_img: mainImgPath, owner_id, estimate_value
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
      estimate_value,
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
      estimate_value
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
  search_item,
  upload_item,
  get_item_for_owner,
  delete_item,
  update_item
}
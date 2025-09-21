const Category = require('../models/categoryModel');

const get_all_category = (req, res) => {
    Category.find()
    .then(result => res.json(result));
}

module.exports = {
    get_all_category
}
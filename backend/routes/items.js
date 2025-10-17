const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');

const itemController = require('../controllers/itemController');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'letsbarter_items', // your folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({storage});

router.get('/', itemController.get_all_items);
router.get('/category', itemController.get_by_category);
router.get('/user-item/:id', itemController.get_item_for_owner)

//uploading item
router.post('/upload', upload.fields([
    {name: 'main_img', maxCount: 1},
    {name: 'images', maxCount: 5}
]), itemController.upload_item);

router.get('/search', itemController.search_item);

//get one item
router.get('/:id', itemController.get_one_item);

router.patch('/:id', upload.fields([
    {name: 'main_img', maxCount: 1},
    {name: 'images', maxCount: 5}
]), itemController.update_item);

router.delete('/:id', itemController.delete_item);

module.exports = router;
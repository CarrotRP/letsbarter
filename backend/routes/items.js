const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const itemController = require('../controllers/itemController');

const storage = multer.diskStorage({
  destination: (req, file, done) => done(null, "uploads/"),
  filename: (req, file, done) => {
    const ext = path.extname(file.originalname); // keep original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    done(null, uniqueSuffix + ext);
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
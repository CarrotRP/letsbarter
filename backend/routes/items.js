const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const itemController = require('../controllers/itemController');

//multer storage
const storage = multer.diskStorage({
    destination: (req, file, done) => done(null, "uploads/"),
    filename: (req, file, done) => done(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({storage});

router.get('/', itemController.get_all_items);
router.get('/category', itemController.get_by_category);
router.get('/user-item/:id', itemController.get_item_for_owner)
router.post('/upload', upload.fields([
    {name: 'main_img', maxCount: 1},
    {name: 'images', maxCount: 5}
]), itemController.upload_item);
router.get('/:id', itemController.get_one_item);
// router.patch('/:id')
// router.delete('/:id')

module.exports = router;
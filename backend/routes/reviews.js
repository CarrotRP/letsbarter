const express = require("express");
const router = express.Router();

const reviewController = require('../controllers/reviewController')

//get review for a user
router.get('/:id', reviewController.get_reviews);

//post review
router.post('/:id', reviewController.post_review)

module.exports = router;
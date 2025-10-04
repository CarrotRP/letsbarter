const Review = require('../models/reviewModel');

const get_reviews = (req, res) => {
    const { id } = req.params;
    const {limit, page} = req.query;

    let totalPage = 0;
    let skip = (page - 1) * limit;

    Review.countDocuments({revieweeId: id})
        .then(count => {
            totalPage = Math.ceil(count / limit);
            return Review.find({ revieweeId: id })
                .populate("reviewerId", "username profile_img").limit(limit).skip(skip)
                .then(result => res.json({result, totalPage}))
        })
}

const post_review = (req, res) => {
    const { id } = req.params;
    const { rating, comment, reviewerId } = req.body;

    Review.create({ revieweeId: id, reviewerId, rating, comment })
        .then(result => Review.findById(result._id)
            .populate('reviewerId', 'username profile_img'))
        .then(populated => res.json(populated));
}

module.exports = {
    get_reviews,
    post_review
}
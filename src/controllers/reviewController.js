const Review = require("../models/Review");

// Add Review
const addProductReview = async (req, res) => {
    const { productId, rating, comment } = req.body;

    try {
        const review = await Review.create({ userId: req.user.id, productId, rating, comment });
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get Reviews for a Product
const getProductReview = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { productId: req.params.productId } });
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    addProductReview,
    getProductReview,
};

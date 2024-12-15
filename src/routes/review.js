const express = require('express');
const Review = require('../models/Review');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Add Review
router.post('/', authenticateToken, async (req, res) => {
  const { productId, rating, comment } = req.body;

  try {
    const review = await Review.create({ userId: req.user.id, productId, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Reviews for a Product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { productId: req.params.productId } });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
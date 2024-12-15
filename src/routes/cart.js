const express = require('express');
const Cart = require('../models/Cart');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Add to Cart
router.post('/', authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const cartItem = await Cart.create({ userId: req.user.id, productId, quantity });
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Cart Items
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ where: { userId: req.user.id } });
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
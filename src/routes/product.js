const express = require('express');
const Product = require('../models/Product');
const { authenticateToken } = require('../middlewares/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Add Product (Admin/Seller Only)
router.post('/', authenticateToken, async (req, res) => {
  const { name, description, price, category, stock, imageUrl } = req.body;

  try {
    const product = await Product.create({ name, description, price, category, stock, imageUrl });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Search Products
router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`, // Sequelize operator for partial match
        },
      },
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
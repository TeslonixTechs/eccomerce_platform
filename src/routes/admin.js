const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { authenticateToken } = require('../middlewares/auth');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

const router = express.Router();

// User Management - Get all users
router.get('/users', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// User Management - Block/Unblock a User
router.put('/users/:id/block', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Product Management - Get all products
router.get('/products', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Order Management - Get all orders
router.get('/orders', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const orders = await Order.findAll({ include: ['User', 'Product'] });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Order Management - Update order status
router.put('/orders/:id/status', authenticateToken, authorizeAdmin, async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.status(200).json({ message: `Order status updated to ${status}.` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Analytics - Get dashboard metrics
router.get('/analytics', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalOrders = await Order.count();
    const totalRevenue = await Order.sum('totalAmount');

    res.status(200).json({ totalUsers, totalOrders, totalRevenue });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
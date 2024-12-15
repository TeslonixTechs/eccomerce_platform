const express = require('express');
const Order = require('../models/Order');
const Delivery = require('../models/Delivery');
const { authenticateToken } = require('../middlewares/auth');
const generateTrackingNumber = require('../utils/generateTrackingNumber');
const Notification = require('../models/Notification'); // Import Notification model

const router = express.Router();

// Place Order

router.post('/', authenticateToken, async (req, res) => {
  const { productId, quantity, totalAmount } = req.body;

  try {
    const order = await Order.create({ userId: req.user.id, productId, quantity, totalAmount });

    const trackingNumber = generateTrackingNumber();
    await Delivery.create({ orderId: order.id, trackingNumber });

    // Create a notification for the user
    const io = req.app.get('io'); // Get Socket.IO instance
    await Notification.create({
      userId: req.user.id,
      message: `Your order for product ID ${productId} has been placed successfully.`,
      type: 'order',
    });

  // Emit real-time notification
  io.to(req.user.id).emit('notification', {
    message: `Your order for product ID ${productId} has been placed successfully.`,
    type: 'order',
  });

    res.status(201).json({ order, trackingNumber });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get Orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
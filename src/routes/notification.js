const express = require('express');
const Notification = require('../models/Notification');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Get Notifications for a User
router.get('/', authenticateToken, async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Mark Notification as Read
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);

    if (!notification || notification.userId !== req.user.id) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Notification
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);

    if (!notification || notification.userId !== req.user.id) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await notification.destroy();
    res.status(200).json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
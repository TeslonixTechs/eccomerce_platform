const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const notificationController = require("../controllers/notificationController");
const router = express.Router();

// Get Notifications for a User
router.get("/", authenticateToken, notificationController.getNotifications);

// Mark Notification as Read
router.put("/:id", authenticateToken, notificationController.markNotifications);

// Delete Notification
router.delete("/:id", authenticateToken, notificationController.deleteNotifications);

module.exports = router;

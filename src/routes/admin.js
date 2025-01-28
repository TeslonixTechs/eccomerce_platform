const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const adminController = require("../controllers/adminController");
const router = express.Router();

// User Management - Get all users
router.get("/users", authenticateToken, authorizeAdmin, adminController.getAllUsers);

// User Management - Block/Unblock a User
router.put("/users/:id/block", authenticateToken, authorizeAdmin, adminController.blockUser);

// Product Management - Get all products
router.get("/products", authenticateToken, authorizeAdmin, adminController.getAllProducts);

// Order Management - Get all orders
router.get("/orders", authenticateToken, authorizeAdmin, adminController.getAllOrders);

// Order Management - Update order status
router.put("/orders/:id/status", authenticateToken, authorizeAdmin, adminController.updateOrderStatus);

// Analytics - Get dashboard metrics
router.get("/analytics", authenticateToken, authorizeAdmin, adminController.getAnalytics);

module.exports = router;

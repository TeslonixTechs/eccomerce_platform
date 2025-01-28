const express = require("express");
const Delivery = require("../models/Delivery");
const { authenticateToken } = require("../middlewares/auth");
const generateTrackingNumber = require("../utils/generateTrackingNumber");
const Notification = require("../models/Notification"); // Import Notification model
const orderController = require("../controllers/orderController");
const router = express.Router();

// Place Order

router.post("/", authenticateToken, orderController.placeOrder);

// Get Orders
router.get("/", authenticateToken, orderController.getOrders);

module.exports = router;

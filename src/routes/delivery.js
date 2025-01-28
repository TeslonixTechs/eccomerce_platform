const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const deliveryController = require("../controllers/deliveryController");
const router = express.Router();

// Update Delivery Status
router.put("/:orderId", authenticateToken, deliveryController.updateDeliveryStatus);

// Get Tracking Details
router.get("/track/:trackingNumber", authenticateToken, deliveryController.getTrackingDetails);

// Update Tracking Details
router.post("/update/:trackingNumber", authenticateToken, deliveryController.updateTrackingDetails);

module.exports = router;

const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const cartController = require("../controllers/cartController");
const router = express.Router();

// Add to Cart
router.post("/", authenticateToken, cartController.addToCart);

// Get Cart Items
router.get("/", authenticateToken, cartController.getCartItems);

module.exports = router;

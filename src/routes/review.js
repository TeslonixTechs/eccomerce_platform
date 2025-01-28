const express = require("express");
const Review = require("../models/Review");
const { authenticateToken } = require("../middlewares/auth");
const reviewController = require("../controllers/reviewController");
const router = express.Router();

// Add Review
router.post("/", authenticateToken, reviewController.addProductReview);

// Get Reviews for a Product
router.get("/:productId", reviewController.getProductReview);

module.exports = router;

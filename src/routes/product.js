const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { Op } = require("sequelize");
const productController = require("../controllers/productController");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const router = express.Router();

// Add Product (Admin/Seller Only)
router.post("/", authenticateToken, authorizeAdmin, productController.addProducts);

// Search Products
router.get("/search", productController.searchProducts);

// Get All Products
router.get("/", productController.getAllProducts);

module.exports = router;

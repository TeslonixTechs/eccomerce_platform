const Product = require("../models/Product");
const { Op } = require("sequelize");

// Add Product (Admin/Seller Only)
const addProducts = async (req, res) => {
    const { name, description, price, category, stock, imageUrl } = req.body;

    try {
        const product = await Product.create({ name, description, price, category, stock, imageUrl });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Search Products
const searchProducts = async (req, res) => {
    const { query } = req.query;

    try {
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${query}%`, // Sequelize operator for partial match
                },
            },
        });

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    addProducts,
    searchProducts,
    getAllProducts,
};

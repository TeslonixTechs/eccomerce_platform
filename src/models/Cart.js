const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cart = sequelize.define("Cart", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
});

module.exports = Cart;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notification = sequelize.define("Notification", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, defaultValue: "general" }, // 'order', 'delivery', 'promo'
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Notification;

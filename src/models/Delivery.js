const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const generateTrackingNumber = require("../utils/generateTrackingNumber");

const Delivery = sequelize.define("Delivery", {
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "In Progress" },
    trackingNumber: { type: DataTypes.STRING, unique: true },
    trackingDetails: { type: DataTypes.JSON, defaultValue: [] },
});

Delivery.beforeCreate(async (delivery) => {
    let trackingNumber = generateTrackingNumber();

    // Ensure the tracking number is unique
    while (await Delivery.findOne({ where: { trackingNumber } })) {
        trackingNumber = generateTrackingNumber();
    }

    delivery.trackingNumber = trackingNumber;
});

module.exports = Delivery;

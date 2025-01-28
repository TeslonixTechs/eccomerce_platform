const Delivery = require("../models/Delivery");
const { authenticateToken } = require("../middlewares/auth");

// Update Delivery Status
const updateDeliveryStatus = async (req, res) => {
    try {
        const delivery = await Delivery.update({ status: req.body.status }, { where: { orderId: req.params.orderId } });
        res.status(200).json(delivery);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get Tracking Details
const getTrackingDetails = async (req, res) => {
    const { trackingNumber } = req.params;

    try {
        const delivery = await Delivery.findOne({ where: { trackingNumber } });
        if (!delivery) return res.status(404).send("Tracking number not found");

        res.status(200).json(delivery.trackingDetails);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update Tracking Details
const updateTrackingDetails = async (req, res) => {
    const { trackingNumber } = req.params;
    const { status, update } = req.body;

    try {
        const delivery = await Delivery.findOne({ where: { trackingNumber } });
        if (!delivery) return res.status(404).send("Tracking number not found");

        const updatedTrackingDetails = [...delivery.trackingDetails, { status, update, date: new Date() }];

        await Delivery.update({ status, trackingDetails: updatedTrackingDetails }, { where: { trackingNumber } });

        // Notify the user
        await Notification.create({
            userId: delivery.userId,
            message: `Your order with tracking number ${trackingNumber} is now ${status}.`,
            type: "delivery",
        });

        res.status(200).json({ message: "Tracking details updated successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    updateDeliveryStatus,
    getTrackingDetails,
    updateTrackingDetails,
};

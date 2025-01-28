const Notification = require("../models/Notification");

// Get Notifications for a User
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { userId: req.user.id },
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Mark Notification as Read
const markNotifications = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);

        if (!notification || notification.userId !== req.user.id) {
            return res.status(404).json({ message: "Notification not found" });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json(notification);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete Notification
const deleteNotifications = async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);

        if (!notification || notification.userId !== req.user.id) {
            return res.status(404).json({ message: "Notification not found" });
        }

        await notification.destroy();
        res.status(200).json({ message: "Notification deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getNotifications,
    markNotifications,
    deleteNotifications,
};

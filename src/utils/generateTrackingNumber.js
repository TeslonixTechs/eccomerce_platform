const crypto = require("crypto");

// Generate a unique tracking number
const generateTrackingNumber = () => {
    return crypto.randomBytes(6).toString("hex").toUpperCase(); // Example: "A1B2C3D4E5F6"
};

module.exports = generateTrackingNumber;

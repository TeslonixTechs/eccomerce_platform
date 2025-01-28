const express = require("express");
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");
const paymentController = require("../controllers/paymentController");
// Paypal configuration

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);

const client = new paypal.core.PayPalHttpClient(environment);

router.post("/create-order", paymentController.createOrder);

router.post("/capture-order", paymentController.captureOrder);

module.exports = router;

const paypal = require("@paypal/checkout-server-sdk");

// Paypal configuration

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET);

const client = new paypal.core.PayPalHttpClient(environment);

const createOrder = async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: req.body.amount } }],
    });

    try {
        const order = await client.execute(request);

        res.status(200).json(order.result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const captureOrder = async (req, res) => {
    const orderId = req.body.orderId;
    const request = new paypal.orders.OrdersCreateRequest(orderId);
    request.requestBody({});

    try {
        const capture = await client.execute(request);

        res.status(200).json(capture.result);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createOrder,
    captureOrder,
};

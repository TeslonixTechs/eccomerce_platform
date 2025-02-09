const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var session = require("express-session");
const dotenv = require("dotenv");
const sequelize = require("./src/config/database");
const authRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/product");
const cartRoutes = require("./src/routes/cart");
const orderRoutes = require("./src/routes/order");
const deliveryRoutes = require("./src/routes/delivery");
const reviewRoutes = require("./src/routes/review");
const notificationRoutes = require("./src/routes/notification");
const adminRoutes = require("./src/routes/admin");

dotenv.config();

const app = express();

// Real time notifications
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Socket.IO connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

app.set("io", io); // Attach to app instance

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session
app.use(
    session({
        secret: "eccommerce",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected...");
    })
    .catch((err) => {
        console.error("Database connection failed:", err.message);
    });
sequelize
    .sync({ alter: true }) // Ensures the table is created or updated
    .then(() => console.log("Database synchronized"))
    .catch((err) => console.error("Error synchronizing database:", err));

// Routes
app.use("/api/auth", authRoutes); // Authentication and User Management
app.use("/api/products", productRoutes); // Product Management and Search
app.use("/api/cart", cartRoutes); // Cart Management
app.use("/api/orders", orderRoutes); // Order Management
app.use("/api/delivery", deliveryRoutes); // Delivery Tracking
app.use("/api/reviews", reviewRoutes); // Reviews and Ratings
app.use("/api/notifications", notificationRoutes); // Notifications
app.use("/api/admin", adminRoutes); // Admin

// Default route for health checks
app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce platform");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const orderRoutes = require("./order-module/routes/order.routes");
const authMiddleware = require("./auth-module/middleware/auth.middleware");

const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("El Ghandoura Store API is running");
});

// Test route
app.get("/orders/test-server", (req, res) => {
    res.send("Orders test from server works");
});

// Protected Orders routes
app.use("/orders", authMiddleware, orderRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });
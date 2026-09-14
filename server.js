const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./order-module/routes/order.routes");
const productRoutes = require("./product-module/routes/product.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Home route
app.get("/", (req, res) => {
    res.send("El Ghandoura Store API is running");
});

// Test route directly from server
app.get("/orders/test-server", (req, res) => {
    res.send("Orders test from server works");
});

// Orders routes
app.use("/orders", orderRoutes);

// Products routes
app.use("/products", productRoutes);

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
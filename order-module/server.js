const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(express.json());

app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("El Ghandoura Store API is running");
});

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
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

// Auth Routes
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("El Ghandoura Store Auth API is running");
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(process.env.PORT, () => {
            console.log(
                `Auth server is running on port ${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.log(
            "MongoDB connection failed:",
            error.message
        );
    });
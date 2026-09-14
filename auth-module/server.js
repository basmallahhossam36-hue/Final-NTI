const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const {
    signup,
    login
} = require("./controllers/auth.controller");

const authMiddleware = require("./middleware/auth.middleware");

const app = express();

// CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Parse form-urlencoded requests
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
    res.send("El Ghandoura Store Auth API is running");
});

// Auth routes
app.post("/auth/signup", signup);

app.post("/auth/login", login);

app.get("/auth/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user
    });
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, "0.0.0.0", () => {
            console.log(
                `Auth server is running on port ${PORT}`
            );
        });
    })
    .catch((error) => {
        console.log(
            "MongoDB connection failed:",
            error.message
        );
    });
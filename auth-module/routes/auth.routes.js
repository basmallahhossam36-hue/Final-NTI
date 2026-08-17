const express = require("express");

const {
    signup,
    login
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Protected profile route
router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user
    });
});

module.exports = router;
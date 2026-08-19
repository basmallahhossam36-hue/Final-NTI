const express = require("express");
const router = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require("../controllers/order.controller");

const authMiddleware = require("../../auth-module/middleware/auth.middleware");
const upload = require("../middleware/upload");

// Test route
router.get("/test", (req, res) => {
    res.send("Orders route is working");
});

// Get all orders - Protected
router.get(
    "/",
    authMiddleware,
    getAllOrders
);

// Get order by ID - Protected
router.get(
    "/:id",
    authMiddleware,
    getOrderById
);

// Create order - Protected
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createOrder
);

// Update order - Protected
router.put(
    "/:id",
    authMiddleware,
    updateOrder
);

// Delete order - Protected
router.delete(
    "/:id",
    authMiddleware,
    deleteOrder
);

module.exports = router;
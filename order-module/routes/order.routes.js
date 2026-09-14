const express = require("express");

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require("../controllers/order.controller");

const upload = require("../middleware/upload");
const authMiddleware = require("../../auth-module/middleware/auth.middleware");

const router = express.Router();

// Create Order
router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createOrder
);

// Get All Orders
router.get(
    "/",
    authMiddleware,
    getAllOrders
);

// Get Order By ID
router.get(
    "/:id",
    authMiddleware,
    getOrderById
);

// Update Order
router.patch(
    "/:id",
    authMiddleware,
    updateOrder
);

// Delete Order
router.delete(
    "/:id",
    authMiddleware,
    deleteOrder
);

module.exports = router;
const express = require("express");

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require("../controllers/order.controller");

const upload = require("../middleware/upload");

const router = express.Router();

// Create Order with Image Upload
router.post("/", upload.single("image"), createOrder);

// Get All Orders
router.get("/", getAllOrders);

// Get Order By ID
router.get("/:id", getOrderById);

// Update Order
router.patch("/:id", updateOrder);

// Delete Order
router.delete("/:id", deleteOrder);

module.exports = router;
const express = require("express");

const {
    createOrder,
    getAllOrders,
    getAllOrdersAdmin,
    getOrderById,
    updateOrder,
    updateOrderAdmin,
    deleteOrder,
    deleteOrderAdmin
} = require("../controllers/order.controller");

const upload = require("../middleware/upload");
const authMiddleware = require("../../auth-module/middleware/auth.middleware");

const router = express.Router();


// ================= CREATE ORDER =================

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createOrder
);


// ================= USER ORDERS =================

// Get orders for the logged-in user only
router.get(
    "/",
    authMiddleware,
    getAllOrders
);


// ================= ADMIN ORDERS =================

// Get ALL orders
router.get(
    "/admin",
    authMiddleware,
    getAllOrdersAdmin
);


// Update any order - Admin
router.patch(
    "/admin/:id",
    authMiddleware,
    updateOrderAdmin
);


// Delete any order - Admin
router.delete(
    "/admin/:id",
    authMiddleware,
    deleteOrderAdmin
);


// ================= GET ONE USER ORDER =================

router.get(
    "/:id",
    authMiddleware,
    getOrderById
);


// ================= UPDATE USER ORDER =================

router.patch(
    "/:id",
    authMiddleware,
    updateOrder
);


// ================= DELETE USER ORDER =================

router.delete(
    "/:id",
    authMiddleware,
    deleteOrder
);


module.exports = router;
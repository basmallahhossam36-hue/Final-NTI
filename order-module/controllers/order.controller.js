const Order = require("../models/order.model");

// Create Order
const createOrder = async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            image: req.file ? req.file.filename : null
        };

        const order = await Order.create(orderData);

        res.status(201).json({
            message: "Order created successfully",
            order: order
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create order",
            error: error.message
        });
    }
};

// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        res.status(200).json({
            orders: orders
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get orders",
            error: error.message
        });
    }
};

// Get Order By ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            order: order
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid order ID",
            error: error.message
        });
    }
};

// Update Order
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order updated successfully",
            order: order
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update order",
            error: error.message
        });
    }
};

// Delete Order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            message: "Order deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete order",
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};
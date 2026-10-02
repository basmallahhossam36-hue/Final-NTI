const Order = require("../models/order.model");


// ================= CREATE ORDER =================

const createOrder = async (req, res) => {

    try {

        const orderData = {

            ...req.body,

            // Get current logged-in user's ID
            userId: req.user.id,

            image: req.file
                ? req.file.filename
                : null

        };

        const order = await Order.create(orderData);

        res.status(201).json({

            message: "Order created successfully",

            order: order

        });

    } catch (error) {

        console.error("CREATE ORDER ERROR:", error);

        res.status(400).json({

            message: "Failed to create order",

            error: error.message

        });

    }

};


// ================= GET USER ORDERS =================

const getAllOrders = async (req, res) => {

    try {

        // Only get orders belonging to
        // the currently logged-in user

        const orders = await Order.find({

            userId: req.user.id

        }).sort({

            orderDate: -1

        });

        res.status(200).json({

            orders: orders

        });

    } catch (error) {

        console.error("GET ORDERS ERROR:", error);

        res.status(500).json({

            message: "Failed to get orders",

            error: error.message

        });

    }

};


// ================= ADMIN GET ALL ORDERS =================

const getAllOrdersAdmin = async (req, res) => {

    try {

        // Only admin can access all orders

        if (req.user.role !== "admin") {

            return res.status(403).json({

                message: "Access denied. Admin only."

            });

        }

        // Get ALL orders from all users

        const orders = await Order.find()
            .sort({
                orderDate: -1
            });

        res.status(200).json({

            orders: orders

        });

    } catch (error) {

        console.error(
            "GET ALL ADMIN ORDERS ERROR:",
            error
        );

        res.status(500).json({

            message: "Failed to get all orders",

            error: error.message

        });

    }

};


// ================= GET ONE USER ORDER =================

const getOrderById = async (req, res) => {

    try {

        const order = await Order.findOne({

            _id: req.params.id,

            userId: req.user.id

        });

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


// ================= UPDATE USER ORDER =================

const updateOrder = async (req, res) => {

    try {

        const order = await Order.findOneAndUpdate(

            {
                _id: req.params.id,
                userId: req.user.id
            },

            req.body,

            {
                new: true,
                runValidators: true
            }

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


// ================= ADMIN UPDATE ORDER =================

const updateOrderAdmin = async (req, res) => {

    try {

        // Only admin can update any order

        if (req.user.role !== "admin") {

            return res.status(403).json({

                message: "Access denied. Admin only."

            });

        }

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

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

        console.error(
            "ADMIN UPDATE ORDER ERROR:",
            error
        );

        res.status(400).json({

            message: "Failed to update order",

            error: error.message

        });

    }

};


// ================= DELETE USER ORDER =================

const deleteOrder = async (req, res) => {

    try {

        const order = await Order.findOneAndDelete({

            _id: req.params.id,

            userId: req.user.id

        });

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


// ================= ADMIN DELETE ORDER =================

const deleteOrderAdmin = async (req, res) => {

    try {

        // Only admin can delete any order

        if (req.user.role !== "admin") {

            return res.status(403).json({

                message: "Access denied. Admin only."

            });

        }

        const order = await Order.findByIdAndDelete(

            req.params.id

        );

        if (!order) {

            return res.status(404).json({

                message: "Order not found"

            });

        }

        res.status(200).json({

            message: "Order deleted successfully"

        });

    } catch (error) {

        console.error(
            "ADMIN DELETE ORDER ERROR:",
            error
        );

        res.status(400).json({

            message: "Failed to delete order",

            error: error.message

        });

    }

};


// ================= EXPORTS =================

module.exports = {

    createOrder,

    getAllOrders,

    getAllOrdersAdmin,

    getOrderById,

    updateOrder,

    updateOrderAdmin,

    deleteOrder,

    deleteOrderAdmin

};
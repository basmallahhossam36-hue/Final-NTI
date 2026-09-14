const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    customerName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    address: {
        type: String,
        required: true,
        trim: true
    },

    productName: {
        type: String,
        required: true,
        trim: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },

    image: {
        type: String
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Preparing",
            "Reached KSA",
            "Shipped",
            "Reached Egypt",
            "Delivered"
        ],
        default: "Pending"
    },

    orderDate: {
        type: Date,
        default: Date.now
    }

});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
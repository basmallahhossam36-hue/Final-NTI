const express = require("express");
const mongoose = require("mongoose");

const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(express.json());

app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("El Ghandoura Store API is running");
});

mongoose
    .connect("mongodb+srv://basmallahhossam36_db_user:Basmallah@cluster0.d69jyjl.mongodb.net/?appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });
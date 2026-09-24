const Product = require("../models/product.model");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "el-ghandoura/products"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );

        stream.end(buffer);
    });
};


// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get products",
            error: error.message
        });
    }
};


// Get one product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get product",
            error: error.message
        });
    }
};


// Create product
const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        let images = [];

        if (req.files && req.files.length > 0) {
            images = await Promise.all(
                req.files.map((file) =>
                    uploadToCloudinary(file.buffer)
                )
            );
        }

        const product = await Product.create({
            name,
            description,
            price,
            images
        });

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create product",
            error: error.message
        });
    }
};


// Update product
const updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        product.name = name;
        product.description = description;
        product.price = price;

        if (req.files && req.files.length > 0) {
            const images = await Promise.all(
                req.files.map((file) =>
                    uploadToCloudinary(file.buffer)
                )
            );

            product.images = images;
        }

        await product.save();

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update product",
            error: error.message
        });
    }
};


// Delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });
    }
};


module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
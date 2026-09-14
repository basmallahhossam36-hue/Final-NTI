const express = require("express");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

const upload = require("../middleware/upload");

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get one product
router.get("/:id", getProductById);

// Create product with up to 5 images
router.post("/", upload.array("images", 5), createProduct);

// Update product with optional images
router.put("/:id", upload.array("images", 5), updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

module.exports = router;
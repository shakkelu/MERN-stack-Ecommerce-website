import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";

// Set up multer storage configuration for memory storage (for image processing)
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Route to create a new product with multiple images
router.post("/create-products", upload.array("images", 5), createProduct);

// Route to fetch all products
router.get("/get-products", getProducts);

// Route to get a single product by ID (for product page)
router.get("/:id", getProductById);

export default router;

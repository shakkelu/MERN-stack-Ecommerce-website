import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary"; // Cloudinary config is already set up in server.js

// Set up multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png"],
    public_id: (req, file) => file.fieldname + "-" + Date.now(),
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Route to create a new product with multiple images
router.post("/create-products", upload.array("images", 5), createProduct); // Allow up to 5 images

// Route to fetch all products
router.get("/get-products", getAllProducts);

// Route to get a single product by ID (for product page)
router.get("/:id", getProductById);

export default router;

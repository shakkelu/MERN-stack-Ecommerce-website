import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "djltkjhq4",
  api_key: "739659716684423",
  api_secret: "6CDazm7NVWRbmtqQMBcaoTjtBUk",
});
/*
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

*/
// Set up multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // Folder in Cloudinary where images will be stored
    allowed_formats: ["jpg", "png"],
    public_id: (req, file) => file.fieldname + "-" + Date.now(),
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Route to create a new product
router.post("/products/upload", upload.single("image"), createProduct);

// Route to fetch all products
router.get("/products", getAllProducts);

export default router;

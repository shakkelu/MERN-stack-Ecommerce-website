import Product from "../models/product.js";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Controller to create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, sizes } = req.body;
    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Create the directory if it doesn't exist
    const dir = "./uploads/products";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const processedImages = [];

    // Loop through each uploaded image, resize it, and save it to disk
    await Promise.all(
      images.map(async (image, index) => {
        const filename = `image-${Date.now()}-${index}${path.extname(
          image.originalname
        )}`;
        const outputPath = path.join(dir, filename).replace(/\\/g, "/"); // Normalize path

        // Use sharp to resize the image before saving
        await sharp(image.buffer)
          .resize(800, 800, { fit: "cover" })
          .toFile(outputPath);

        processedImages.push({ path: outputPath });
      })
    );

    // Create a new product with the processed image paths
    const newProduct = new Product({
      name,
      description,
      price,
      sizes: JSON.parse(sizes),
      images: processedImages.map((image) => image.path), // Store normalized image paths
      category,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error processing images or saving the product",
      error,
    });
  }
};

// Controller to fetch all products
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({ products, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Controller to get a single product by ID (for the product page)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name") // Populate category name
      .exec();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product); // Return the full product details including all images
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

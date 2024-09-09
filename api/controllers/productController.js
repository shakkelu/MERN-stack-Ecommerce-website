import Product from "../models/product.js";

// Controller to create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // The URLs of the uploaded images on Cloudinary
    const imageUrls = req.files.map((file) => file.path);

    // Create a new product with multiple images
    const newProduct = new Product({
      name,
      description,
      price,
      images: imageUrls, // Store the array of image URLs
      category,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error saving the product", error });
  }
};

// Controller to fetch all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
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

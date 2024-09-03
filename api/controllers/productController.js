import Product from "../models/product.js";

// Controller to create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // The URL of the uploaded image on Cloudinary
    const imageUrl = req.file.path;

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      image: imageUrl,
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

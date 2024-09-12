import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [
    {
      size: String, // e.g., 'S', 'M', 'L', 'XL'
      stock: Number, // Number of items available in this size
    },
  ],
  images: [{ type: String, required: true }], // Array of image URLs
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

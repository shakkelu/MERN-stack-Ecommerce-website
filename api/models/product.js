import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;

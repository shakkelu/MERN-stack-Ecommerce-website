import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const categoryModel = mongoose.model("Category", categorySchema);
export default categoryModel;

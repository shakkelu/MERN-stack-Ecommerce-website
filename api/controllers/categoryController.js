import Category from "../models/category.js";

// Controller to create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Create a new category
    const newCategory = new Category({
      name,
      description,
    });

    // Save the category to the database
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error saving the category", error });
  }
};

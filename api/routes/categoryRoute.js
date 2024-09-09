import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

// Get all categories
router.get("/get-categories", getCategories);

// Route to create a new category
router.post("/create-category", createCategory);

export default router;

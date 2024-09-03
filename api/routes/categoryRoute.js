import express from "express";
import { createCategory } from "../controllers/categoryController.js";

const router = express.Router();

// Route to create a new category
router.post("/categories", createCategory);

export default router;

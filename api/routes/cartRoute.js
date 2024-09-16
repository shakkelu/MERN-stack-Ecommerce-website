import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js"; // Import the middleware
import { cartUpdate } from "../controllers/cartController.js";

const router = express.Router();

// Route to add a product to the cart - protected route
router.post("/add-to-cart", isAuthenticated, cartUpdate);

export default router;

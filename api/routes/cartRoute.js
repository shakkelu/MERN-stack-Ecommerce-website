import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js"; // Import the middleware
import { cartUpdate, getCart } from "../controllers/cartController.js";

const router = express.Router();

// Route to add a product to the cart - protected route
router.post("/add-to-cart", isAuthenticated, cartUpdate);

// Route to get all items in the cart for the authenticated user - protected route

router.get("/get-cart", isAuthenticated, getCart);

export default router;

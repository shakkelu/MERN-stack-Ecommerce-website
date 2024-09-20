import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js"; // Assuming you have an auth middleware

const router = express.Router();

// POST route to place an order
router.post("/place-order", isAuthenticated, placeOrder);

export default router;

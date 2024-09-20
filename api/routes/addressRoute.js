import express from "express";
import {
  createAddress,
  getUserAddresses,
} from "../controllers/addressController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get addresses for the authenticated user
router.get("/user-addresses", isAuthenticated, getUserAddresses);

// Route to create a new address
router.post("/add-address", isAuthenticated, createAddress);

export default router;

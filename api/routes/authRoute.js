import express from "express";
import {
  loginController,
  registercontroller,
} from "../controllers/authcontroller.js";

const router = express.Router();

// POST route for user registration
router.post("/register", registercontroller);

// POST route for user login
router.post("/login", loginController);

export default router;

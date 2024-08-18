import express from "express";
import {
  loginController,
  privatecontent,
  registercontroller,
} from "../controllers/authcontroller.js"; // Adjust the path as necessary
import { loggedin } from "../middleware/authmiddleware.js";

const router = express.Router();

// POST route for user registration
router.post("/register", registercontroller);

// POST route for user login
router.post("/login", loginController);

router.post("/logged", loggedin, privatecontent);

export default router;

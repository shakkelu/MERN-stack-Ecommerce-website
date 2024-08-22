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

// private routes
router.post("/logged", loggedin, privatecontent);

router.get("/account", loggedin, (req, res) => {
  res.send({ set: "ok" });
});

export default router;

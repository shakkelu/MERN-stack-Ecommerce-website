import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

// Middleware function to authenticate a user
export const isAuthenticated = async (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization; // 'Bearer <token>'
  console.log(`Token extracted: ${token}`);

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace JWT_SECRET with your secret
    console.log("Decoded token:", decoded);
    // Attach user to request after verification
    req.user = await userModel.findById(decoded._id).select("-password"); // Optionally, exclude password

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};

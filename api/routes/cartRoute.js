import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js"; // Import the middleware
import { cartUpdate, getCart } from "../controllers/cartController.js";
import Cart from "../models/cart.js"; // Adjust the path as needed

const router = express.Router();

// Route to add a product to the cart - protected route
router.post("/add-to-cart", isAuthenticated, cartUpdate);

// Route to get all items in the cart for the authenticated user - protected route

router.get("/get-cart", isAuthenticated, getCart);

// routes/cartRoute.js

// Delete an item from the cart
router.delete("/remove-item/:productId", isAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product to remove it from the cart
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    // Save the updated cart
    await cart.save();

    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

export default router;

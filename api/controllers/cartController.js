import Cart from "./models/cart.js"; // Cart model
import Product from "./models/product.js"; // Product model for validation

export const cartUpdate = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the cart for the authenticated user
    let cart = await Cart.findOne({ user: req.user._id });

    // If no cart exists, create one
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if the product is already in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // If product is already in cart, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If product is not in cart, add it
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart
    await cart.save();

    res.json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart", error });
  }
};

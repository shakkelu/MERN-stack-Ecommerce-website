import Cart from "../models/cart.js"; // Cart model
import Product from "../models/product.js"; // Product model for validation

/*

cart creation for users and its updates

*/

export const cartUpdate = async (req, res) => {
  console.log("Entering to cartUpdate finction");
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
      // Create a new cart with an empty array for items
      cart = new Cart({ user: req.user._id, items: [] });

      // Save the cart to the database
      await cart.save();
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

/* 

getting all carts items list

*/

export const getCart = async (req, res) => {
  try {
    // Find the cart for the authenticated user
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Return the cart items and other details
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

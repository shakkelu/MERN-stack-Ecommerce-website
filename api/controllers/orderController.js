import Order from "../models/order.js";

// Controller function to handle placing an order
export const placeOrder = async (req, res) => {
  try {
    const { cartItems, totalPrice, address } = req.body;
    console.log("place order function");
    const userId = req.user._id; // Assuming you're using authentication middleware to get the user

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    // Create new order
    const newOrder = new Order({
      user: userId,
      cartItems,
      totalPrice,
      address,
    });

    await newOrder.save();

    return res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Failed to place the order" });
  }
};

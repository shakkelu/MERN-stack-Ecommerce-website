import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import CartCard from "./cartCard.js"; // Import the CartCard component

const CartPage = () => {
  const { auth } = useAuth();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (auth.token) {
          // Ensure token is available before making the request
          console.log(
            `sending request from cart page, token is ${auth.token} `
          );
          const response = await axios.get(
            "http://localhost:4000/api/cart/get-cart"
          );
          setCart(response.data);
          console.log("Cart data fetched");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [auth.token]); // The effect runs once when token becomes available

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.product._id !== productId),
    }));
  };

  // If no cart or no items, show an empty cart message
  if (!cart || cart.items.length === 0) {
    console.log("No cart");
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <CartCard
            key={item.product._id}
            item={item}
            removeFromCart={removeFromCart}
          />
        ))}
      </ul>
      <p>Total Items: {cart.items.length}</p>
    </div>
  );
};

export default CartPage;

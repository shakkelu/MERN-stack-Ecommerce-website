import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import CartCard from "./cartCard.js"; // Import the CartCard component

const CartPage = () => {
  const { auth, loading } = useAuth(); // Access the loading state
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (auth.token && !loading) {
          // Wait for token and ensure it's not loading
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

    if (!loading) {
      fetchCart(); // Only fetch cart when loading is complete
    }
  }, [auth.token, loading]); // The effect runs once when token and loading change

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.product._id !== productId),
    }));
  };

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no cart or no items, show an empty cart message
  if (!cart || cart.items.length === 0) {
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

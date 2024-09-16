import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext"; // Assuming you use AuthContext for authentication

const CartPage = () => {
  const { auth } = useAuth(); // Get the auth object from the AuthContext
  const [cart, setCart] = useState(null);

  // Fetch cart items when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/cart/get-cart"
        );
        setCart(response.data); // Set cart data in state
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [auth.token]); // Dependency on auth.token so it updates if the user logs in/out

  // If no cart or no items, show an empty cart message
  if (!cart || cart.items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.product._id}>
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              width="50"
            />
            <p>{item.product.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.product.price}</p>
          </li>
        ))}
      </ul>
      <p>Total Items: {cart.items.length}</p>
    </div>
  );
};

export default CartPage;

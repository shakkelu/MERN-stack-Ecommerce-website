import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import CartCard from "./cartCard.js";

const CartPage = () => {
  const { auth, loading } = useAuth();
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (auth.token && !loading) {
          const response = await axios.get(
            "http://localhost:4000/api/cart/get-cart"
          );
          setCart(response.data);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (!loading) {
      fetchCart();
    }
  }, [auth.token, loading]);

  // Calculate total price of all items
  const calculateTotalPrice = () => {
    return cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const totalPrice = cart ? calculateTotalPrice() : 0;

  // Handle navigation to the checkout page
  const handleCheckout = () => {
    navigate("/checkout", { state: { cart, totalPrice } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            removeFromCart={(productId) =>
              setCart((prevCart) => ({
                ...prevCart,
                items: prevCart.items.filter(
                  (item) => item.product._id !== productId
                ),
              }))
            }
          />
        ))}
      </ul>
      <p>Total Items: {cart.items.length}</p>
      <p>Total Price: ${totalPrice}</p>

      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;

// components/CartCard.js
import React from "react";
import axios from "axios";

const CartCard = ({ item, removeFromCart }) => {
  const handleRemove = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/api/cart/remove-item/${item.product._id}`
      );
      removeFromCart(item.product._id); // Call the callback function to update the cart in the parent component
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <li className="cart-card">
      <img src={item.product.images[0]} alt={item.product.name} width="50" />
      <p>{item.product.name}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${item.product.price}</p>
      <button onClick={handleRemove}>Remove</button>
    </li>
  );
};

export default CartCard;

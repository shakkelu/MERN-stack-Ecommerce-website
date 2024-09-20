import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // You can pass order details via location.state from the CheckoutPage
  const { orderId, totalPrice } = location.state || {};

  const handleContinueShopping = () => {
    navigate("/"); // Navigate back to the homepage or products page
  };

  return (
    <div className="order-success-page">
      <h1>Order Placed Successfully!</h1>

      {orderId && (
        <p>
          Your Order ID: <strong>{orderId}</strong>
        </p>
      )}
      {totalPrice && <p>Total Price: ${totalPrice}</p>}

      <p>
        Thank you for shopping with us! Your order is being processed, and we
        will notify you once it's shipped.
      </p>

      <button onClick={handleContinueShopping}>Continue Shopping</button>
    </div>
  );
};

export default OrderSuccessPage;

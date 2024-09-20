import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Accessing cart and totalPrice from location state
  const { cart, totalPrice } = location.state || {};
  console.log(cart);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/addresses/user-addresses"
        );
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  // Handle place order submission
  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError("Please select a delivery address.");
      return;
    }

    try {
      // Send order data to the backend
      const response = await axios.post(
        "http://localhost:4000/api/orders/place-order",
        {
          cartItems: cart.items,
          totalPrice,
          address: selectedAddress,
        }
      );

      console.log("Order placed successfully", response.data);

      // Redirect user to a success page or confirmation
      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place the order. Please try again.");
    }
  };

  // Redirect to address creation page
  const handleAddAddress = () => {
    navigate("/add-address");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-summary">
        <p>Total Price: ${totalPrice}</p>
      </div>

      <div className="checkout-form">
        <h3>Select Delivery Address:</h3>
        {addresses.map((address) => (
          <div key={address._id}>
            <input
              type="radio"
              id={address._id}
              name="address"
              value={address._id}
              onChange={(e) => setSelectedAddress(e.target.value)}
            />
            <label htmlFor={address._id}>
              {address.addressLine1}, {address.city}, {address.state},{" "}
              {address.country} - {address.postalCode}
            </label>
          </div>
        ))}

        {error && <p className="error-message">{error}</p>}

        <button onClick={handlePlaceOrder}>Place Order</button>

        <button onClick={handleAddAddress}>Add New Address</button>
      </div>
    </div>
  );
};

export default CheckoutPage;

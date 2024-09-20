import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAddressPage = () => {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddAddress = async () => {
    if (!addressLine1 || !city || !state || !postalCode || !country) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/addresses/add-address", {
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
      });

      navigate("/checkout"); // Redirect to checkout page after adding address
    } catch (error) {
      console.error("Error adding address:", error);
      setError("Failed to add address. Please try again.");
    }
  };

  return (
    <div className="add-address-page">
      <h2>Add New Address</h2>

      <div className="address-form">
        <label>
          Address Line 1:
          <input
            type="text"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />
        </label>

        <label>
          Address Line 2:
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </label>

        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>

        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>

        <label>
          Postal Code:
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </label>

        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button onClick={handleAddAddress}>Add Address</button>
      </div>
    </div>
  );
};

export default AddAddressPage;

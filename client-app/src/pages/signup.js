import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, phone, address);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      // Check for successful response based on status or other criteria
      if (response.status === 200) {
        console.log("sending success");
        console.log(response.data.message);
      } else {
        console.log("sending failure");
        console.log(response.data.message);
      }
    } catch (error) {
      // Error handling
      console.error(
        "Error occurred:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <div className="signup-form">
      <div className="form-label">Signup form</div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            value={name}
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={phone}
            className="form-control"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={address}
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

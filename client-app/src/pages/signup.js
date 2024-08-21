import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, phone, address);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        { name, email, password, phone, address }
      );

      if (response.status === 200) {
        console.log("Sending success");
        console.log(response.data.message);
        // Reset form fields
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
        // Navigate to login page
        navigate("/login");
      } else {
        console.log("Sending failure");
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error occurred:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <div className="fcc">
      <div className="box-form fcc">
        <form className="fcc" onSubmit={handleSubmit}>
          <div className="form-label">Signup form</div>
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
    </div>
  );
};

export default Signup;

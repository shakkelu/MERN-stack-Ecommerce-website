import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
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
      <div className="form-label">User login</div>
      <form onSubmit={handlelogin}>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

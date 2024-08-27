import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authcontext.js";
import { useMessage } from "../context/messagecontext.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const { message, setMessage } = useMessage();
  const navigate = useNavigate();

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

        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        setMessage(response.data.message);
        setEmail("");
        setPassword("");
        navigate("/");
        //setting user details with token in the local storage

        localStorage.setItem("auth", JSON.stringify(response.data));
      } else {
        console.log("sending failure");
        console.log(response.data.message);
        setMessage(response.data.message);
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
    <div className="fcc">
      <div className="box-form fcc">
        <form className="fcc" onSubmit={handlelogin}>
          <div className="form-label">{message ? message : "Login form"}</div>
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
    </div>
  );
};

export default Login;

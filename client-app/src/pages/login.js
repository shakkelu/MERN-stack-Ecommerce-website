import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext.js";
import { useMessage } from "../context/messagecontext.js";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const { message, setMessage } = useMessage();
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );
      if (response.status === 200) {
        setMessage(response.data.message);
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        setEmail("");
        setPassword("");
        navigate("/");
        localStorage.setItem("auth", JSON.stringify(response.data));
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : error.message);
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <NavLink to="/forgot-password">Forgot password?</NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;

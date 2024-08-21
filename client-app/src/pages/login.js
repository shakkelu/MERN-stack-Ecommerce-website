import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authcontext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

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
        //setting user details with token in the local storage
        const localdata = JSON.stringify(response.data);
        const localkey = "auth";
        function setItem(key, value) {
          return new Promise((resolve, reject) => {
            try {
              localStorage.setItem(key, value);
              resolve("Item set successfully"); // Resolve the promise with a success message
            } catch (error) {
              reject("Failed to set item"); // Reject the promise if an error occurs
            }
          });
        }

        setItem(localkey, localdata)
          .then((message) => {
            console.log(message); // This will log 'Item set successfully' to the console
          })
          .catch((error) => {
            console.error(error); // This will log 'Failed to set item' to the console if there's an error
          });

        const getdata = localStorage.getItem("auth");
        console.log(getdata);
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
    <div className="fcc">
      <div className="box-form fcc">
        <form className="fcc" onSubmit={handlelogin}>
          <div className="form-label">User login</div>
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

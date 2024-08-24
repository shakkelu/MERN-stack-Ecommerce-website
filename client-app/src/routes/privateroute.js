import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

const AccessReq = () => {
  const [ok, setOk] = useState(null); // `null` for loading state

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("sending request");
        const response = await axios.get(
          process.env.REACT_APP_API_URL ||
            "http://localhost:4000/api/auth/account"
        );

        if (response.data) {
          setOk(true);
          console.log("response got");
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setOk(false);
      }
    };

    verifyAuth();
  }, []);

  if (ok === null) {
    return <div>Loading...</div>; // Or a spinner
  }

  return <>{ok ? <Outlet /> : "Not authorized"}</>;
};

export default AccessReq;

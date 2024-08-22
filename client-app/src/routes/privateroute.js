import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import axios from "axios";

const AccessReq = () => {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/account"
        );
        const received = response.data.set;
        console.log(received);
        // Adjust the condition based on the actual value of `received`
        if (received) {
          setOk(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setOk(false);
      }
    };

    verifyAuth();
  }, []); // Empty dependency array ensures this runs only on mount

  return <>{ok ? <Outlet /> : "Not authorized"}</>;
};

export default AccessReq;

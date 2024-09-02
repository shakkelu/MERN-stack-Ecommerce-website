import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((n) => --n);
    }, 1000);
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, location]);
  return (
    <>
      <h2>Redirecting to you in {count}</h2>
    </>
  );
};

export default Redirect;

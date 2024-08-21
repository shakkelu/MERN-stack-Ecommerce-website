import React from "react";
import { useAuth } from "../context/authcontext";

const Account = () => {
  const [auth, setAuth] = useAuth();
  console.log("Reached the private page");
  return <div>Hi {auth.user.name}, your account contents are here</div>;
};

export default Account;

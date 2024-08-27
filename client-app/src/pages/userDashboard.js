import React from "react";
import { useAuth } from "../context/authcontext.js";

const UserDashboard = () => {
  const { auth } = useAuth();
  console.log("Reached the private page");
  return <div>Hi {auth.user.name}, your account contents are here</div>;
};

export default UserDashboard;

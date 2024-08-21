import React from "react";
import { useAuth } from "../context/authcontext";

function Home() {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <h2>Home</h2>
      <pre>{JSON.stringify(auth, null, 4)} </pre>
    </>
  );
}

export default Home;

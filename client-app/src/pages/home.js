import React from "react";
import { useAuth } from "../context/authContext";
import ProductPage from "../components/productPage";

function Home() {
  const { auth } = useAuth();

  return (
    <>
      <h2>Home</h2>
      <pre>{JSON.stringify(auth, null, 4)} </pre>
      <ProductPage />
    </>
  );
}

export default Home;

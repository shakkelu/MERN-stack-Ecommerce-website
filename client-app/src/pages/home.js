import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import ProductCard from "./../components/productCard";
import axios from "axios";

function Home() {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/products/get-products"
        );
        setProducts(response.data);
        console.log("Product recieved");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h2>Home</h2>
      <pre>{JSON.stringify(auth, null, 4)} </pre>

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </>
  );
}

export default Home;

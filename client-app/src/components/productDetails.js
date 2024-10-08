import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams(); // Get product ID from the route
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details using the productId
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Function to handle adding a product to the cart
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/cart/add-to-cart", // Cart route
        { productId: product._id, quantity: 1 } // Payload for adding to cart
      );
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page container mt-5">
      {/* Bootstrap Carousel for Multiple Images */}
      <div
        id="productCarousel"
        className="carousel slide wid"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {product.images.map((image, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img
                src={`http://localhost:4000/${image}`}
                className="d-block w-100 "
                alt={`Product Image ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Previous and Next buttons for the carousel */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#productCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="mt-4 details">
        <h1 className="text-center">{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

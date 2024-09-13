import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <img
          src={`http://localhost:4000/${product.images[0]}`}
          alt={product.name}
          className="product-image"
        />
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">${product.price}</p>
      </Link>

      <button className="btn btn-primary">Add to Cart</button>
    </div>
  );
};

export default ProductCard;

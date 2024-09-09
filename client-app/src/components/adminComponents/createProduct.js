import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch available categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/categories/get-categories"
        );
        setCategories(response.data); // Set categories state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    setImages(e.target.files); // Handle multiple files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]); // Append each image file
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/products/create-products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product created:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="fcc">
      <div className="box-form fcc">
        <form className="fcc" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name of product"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={description}
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={price}
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter the price"
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 fcc">
            <label htmlFor="formFile" className="form-label">
              Select the product images
            </label>
            <input
              className="form-control"
              type="file"
              multiple
              onChange={handleImageChange}
              id="formFile"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

import React, { useState } from "react";
import productService from "../../services/product.service";

function AddForm({ onSubmit }) {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductDetails((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const product = await productService.addProduct(productDetails);
      onSubmit(product);
      setProductDetails({
        name: "",
        description: "",
        price: "",
        image: "",
        featured: false,
      });
    } catch (error) {}
  };

  return (
    <div>
      <h3>Add Product</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={productDetails.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={productDetails.image}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Featured:
          <input
            type="checkbox"
            name="featured"
            checked={productDetails.featured}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddForm;

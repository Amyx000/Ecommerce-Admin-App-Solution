import axios from "axios";
import React, { useState } from "react";

function UpdateForm({ product, onUpdate, onCancel }) {
  const [productDetails, setProductDetails] = useState(product);

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
      const res = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/${productDetails._id}`,
        productDetails
      );
      onUpdate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Update Product</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
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
        <button onClick={onCancel}>Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UpdateForm;

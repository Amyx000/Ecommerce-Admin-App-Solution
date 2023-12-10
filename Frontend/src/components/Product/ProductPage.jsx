import React, { useEffect, useState } from "react";
import axios from "axios";
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState({
    _id: "",
    name: "",
    price: "",
    description: "",
    image: "",
    featured: false,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/product`
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/product/${productId}`
      );
      setProducts((prev) => prev.filter((obj) => obj._id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <AddForm
        onSubmit={(product) => setProducts((prev) => [...prev, product])}
      />
      <hr />
      {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}> */}
      {!selectedProduct._id ? (
        <div>
          {!products.length ? (
            loading ? (
              <div>Loading...</div>
            ) : (
              <div>No Products Found!</div>
            )
          ) : (
            <table border="1">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Featured</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={i}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.featured ? "Yes" : "No"}</td>
                    <td>
                      <button onClick={() => setSelectedProduct(product)}>
                        Update
                      </button>
                      <button onClick={() => handleDelete(product._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div>
          <UpdateForm
            product={selectedProduct}
            onUpdate={(product) => {
              setProducts((prev) =>
                prev.map((obj) => (obj._id === product._id ? product : obj))
              );
              setSelectedProduct({
                _id: "",
                name: "",
                price: "",
                description: "",
                image: "",
                featured: false,
              });
            }}
            onCancel={() =>
              setSelectedProduct({
                _id: "",
                name: "",
                price: "",
                description: "",
                image: "",
                featured: false,
              })
            }
          />
        </div>
      )}
      {/* </div> */}
    </div>
  );
}

export default ProductPage;

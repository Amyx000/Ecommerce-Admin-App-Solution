import React, { useEffect, useState } from "react";
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";
import productService from "../../services/product.service";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
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
      const product = await productService.getAllProducts();
      setProducts(product);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts((prev) => prev.filter((obj) => obj._id !== productId));
    } catch (error) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const products = await productService.searchProductByName({
        name: search,
      });
      setProducts(products || []);
    } catch (error) {}
  };

  return (
    <div>
      <h2>Products</h2>
      <AddForm
        onSubmit={(product) => setProducts((prev) => [...prev, product])}
      />
      <hr />
      {!selectedProduct._id ? (
        <>
          <form onSubmit={handleSearch} style={{ marginBottom: "10px" }}>
            <h3>Search Product</h3>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <div>
            {!products.length ? (
              loading ? (
                <div>Loading...</div>
              ) : (
                <div>No Products Found</div>
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
                          style={{ width: "50px" }}
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
        </>
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
    </div>
  );
}

export default ProductPage;

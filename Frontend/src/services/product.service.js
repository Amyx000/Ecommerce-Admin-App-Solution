import axios from "axios";

const BACKEND_URL = "http://localhost:8081/api";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

const productService = {
  getAllProducts: async () => {
    // write your logic here
    try {
      const res = await axiosInstance.get("/product");
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  addProduct: async (productData) => {
    // write your logic here
    try {
      const res = await axiosInstance.post("/product", productData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (productId, productData) => {
    // write your logic here
    try {
      if (!productId) {
        throw new Error("ProductId is required!");
      }
      const res = await axiosInstance.put(`/product/${productId}`, productData);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    // write your logic here
    try {
      if (!productId) {
        throw new Error("ProductId is required!");
      }
      const res = await axiosInstance.delete(`/product/${productId}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};

export default productService;

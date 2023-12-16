const ProductServiceImpl = require("../service/impl/product.serviceImpl");

const productService = new ProductServiceImpl();

class ProductController {
  async getAllProducts(req, res) {
    // write your logic here
    try {
      const products = await productService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async addProduct(req, res) {
    // write your logic here
    try {
      const fields = ["name", "price", "featured", "description", "image"];
      if (fields.some((field) => req.body[field] === undefined)) {
        return res.status(400).json("Invalid Payload");
      }
      const product = await productService.addProduct(req.body);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async updateProduct(req, res) {
    // write your logic here
    try {
      const productId = req.params.productId;
      const product = await productService.updateProduct(productId, req.body);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async deleteProduct(req, res) {
    // write your logic here
    try {
      const productId = req.params.productId;

      const response = await productService.deleteProduct(productId);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

module.exports = ProductController;

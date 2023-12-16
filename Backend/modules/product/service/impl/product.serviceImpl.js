const Product = require("../../dao/models/product.model");
const ProdcutService = require("../product.service");

class ProductServiceImpl extends ProdcutService {
  async getAllProducts() {
    // write your logic here
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }

  async addProduct(productData) {
    // write your logic here
    try {
      const { name, price, featured, description, image } = productData;
      const product = await Product.create({
        name,
        price,
        image,
        description,
        featured,
      });
      return product;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }

  async updateProduct(productId, productData) {
    // write your logic here
    try {
      const { name, price, featured, description, image } = productData;
      const product = await Product.findByIdAndUpdate(
        productId,
        {
          ...(name !== undefined && { name }),
          ...(price !== undefined && { price }),
          ...(image !== undefined && { image }),
          ...(description !== undefined && { description }),
          ...(featured !== undefined && { featured }),
        },
        { new: true }
      );
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }

  async deleteProduct(productId) {
    // write your logic here
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = ProductServiceImpl;

const Product = require("../model/product.model");

// fetch all product
const getAllProducts = async (req, res) => {
  // write your logic here
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).send("Internal Server Error");
  }
};

//Add Product
const addProduct = async (req, res) => {
  // write your logic here
  try {
    const fields = ["name", "price", "featured", "description", "image"];
    const { name, price, featured, description, image } = req.body;

    if (fields.some((field) => req.body[field] === undefined)) {
      return res.status(400).json({ error: "Invalid Payload" });
    }
    const product = await Product.create({
      name,
      price,
      image,
      description,
      featured,
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).send("Internal Server Error");
  }
};

//Update Product
const updateProduct = async (req, res) => {
  // write your logic here
  try {
    const productId = req.params.productId;
    const { name, price, featured, description, image } = req.body;
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
      return res.status(404).json({ error: "Product not found." });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).send("Internal Server Error");
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  // write your logic here
  try {
    const productId = req.params.productId;

    const product = await Product.findOneAndDelete({ _id: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.status(200).json("Successfully deleted product.");
  } catch (error) {
    return res.status(400).send("Internal Server Error");
  }
};

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };

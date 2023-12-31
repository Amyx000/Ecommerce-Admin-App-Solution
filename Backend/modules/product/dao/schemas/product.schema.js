const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: String,
  featured: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.pluralize(null);

module.exports = productSchema;

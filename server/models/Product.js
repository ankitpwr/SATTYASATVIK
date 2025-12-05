const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    Festival: { type: String, required: false },  
    Idols: { type: String, required: false },    
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

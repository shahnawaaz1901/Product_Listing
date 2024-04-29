//* Packages
import mongoose from "mongoose";

//* Schema
const productSchema = new mongoose.Schema({
  /* Schema Fields */
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

//* Create & Export Model
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;

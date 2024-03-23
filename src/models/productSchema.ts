import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  price: {
    type: String || Number,
    required: true,
  },
  stock: {
    type: String || Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  delete: {
    type: Boolean,
    require: true,
    default: false,
  },
});

export default mongoose.model("productSchema", productSchema);

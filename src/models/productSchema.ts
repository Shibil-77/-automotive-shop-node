import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
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
  imageUrl: {
    type: Object,
  },
  delete: {
    type: Boolean,
    require: true,
    default: false,
  },
});

export default mongoose.model("productSchema", productSchema);

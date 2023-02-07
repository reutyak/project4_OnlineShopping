import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Types.ObjectId,
    },
    productName: {
      type: String,
      required: true,
      unique:true
    },
    productCategory: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("products", productSchema);

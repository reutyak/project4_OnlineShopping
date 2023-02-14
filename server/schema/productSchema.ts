import categoryModel from "../Models/categoryModel";
import mongoose from "mongoose";
const categories = require('../schema/categorySchema');

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
    toJSON: { virtuals: true },
    id: false
  }
);

productSchema.virtual("category", {
  ref: categories,
  localField: "productCategory",
  foreignField: "_id",
  justOne: true
});

module.exports = mongoose.model("products", productSchema);

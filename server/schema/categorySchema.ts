import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Types.ObjectId,
    },
    categoryName: {
      type: String,
      required: true,
      unique:true
    }
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
  }
);



module.exports = mongoose.model("categories", categorySchema);

import mongoose, { Document, model, ObjectId, Schema } from "mongoose";
import {ShoppingCartModel}  from "./ShoppingCartModel";
const products = require('../schema/productSchema');

// 1. Interface: 
export interface IItemModel extends Document {
    productId: string;
    amount: number;
    totalPrice: number;
    CartID: string;

}

// 2. Schema: 
export const itemSchema = new Schema<IItemModel>({
    _id: {
        type: mongoose.Types.ObjectId,
      },
    productId: {
        type: String,
        required: [true, "Missing productId"],
        minlength: [10, "too short"],
        maxlength: [1000, "too long"],
    },
    amount:{
        type: Number,
        required: [true, "Missing amount"],
        min:0,
        max:100,
    },
    totalPrice:{
        type: Number,
        required: [true, "Missing total price"],
        min:0,
    },
    CartID:{
        type: String,
        required: [true, "Missing CartID"],
    },
    },{
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

itemSchema.virtual("product", {
    ref: products,
    localField: "productId",
    foreignField: "_id",
    justOne: true
});

itemSchema.virtual("cart", {
    ref: ShoppingCartModel,
    localField: "CartID",
    foreignField: "_id",
    justOne: true
});

// 3. Model:
export const itemModel = model<IItemModel>("itemModel", itemSchema, "items");

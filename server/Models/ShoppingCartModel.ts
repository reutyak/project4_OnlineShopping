import mongoose, { Document, model, ObjectId, Schema } from "mongoose";
import { UserModel } from "./userModel";

// 1. Interface: 
export interface IShoppingCartModel extends Document {
    userName: string;
    date: string;
}

// 2. Schema: 
export const ShoppingCartSchema = new Schema<IShoppingCartModel>({
    id: {
        type: mongoose.Types.ObjectId,
      },
    userName: {
        type: String,
        required: [true, "Missing name"],
        minlength: [10, "too short"],
        maxlength: [1000, "too long"],
    },
    date:{
        type: String,
        required: [true, "Missing date"],
    },
    },{
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

ShoppingCartSchema.virtual("CustomerID", {
    ref: UserModel,
    localField: "userName",
    foreignField: "email",
    justOne: true
});

// 3. Model:
export const ShoppingCartModel = model<IShoppingCartModel>("ShoppingCartModel", ShoppingCartSchema, "ShoppingCarts");

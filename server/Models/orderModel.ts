import mongoose, { Document, model, ObjectId, Schema } from "mongoose";
import {ShoppingCartModel}  from "./ShoppingCartModel";
import { UserModel } from "./userModel";

// 1. Interface: 
export interface IOrderModel extends Document {
    userEmail: string;
    cartID: string;
    totalPriceToPay: number;
    DeliveryCity: string;
    DeliveryStreet: string;
    DeliveryDate: string;
    OrderDate: string;
    Last4Digits: number;
}

// 2. Schema: 
export const orderSchema = new Schema<IOrderModel>({
    // _id: {
    //     type: mongoose.Types.ObjectId,
    //   },
    userEmail: {
        type: String,
        required: [true, "Missing userID"],
        minlength: [10, "too short"],
        maxlength: [25, "too long"],
    },
    cartID:{
        type: String,
        required: [true, "Missing cartID"],
        minlength: [10, "too short"],
        maxlength: [1000, "too long"],
    },
    totalPriceToPay:{
        type: Number,
        required: [true, "Missing total price"],
        min:0,
    },
    DeliveryCity:{
        type: String,
        required: [true, "Missing city"],
        minlength: [2, "too short"],
        maxlength: [1000, "too long"],
    },
    DeliveryStreet:{
        type: String,
        required: [true, "Missing street"],
        minlength: [2, "too short"],
        maxlength: [1000, "too long"],
    },
    DeliveryDate:{
        type: String,
        required: [true, "Missing Delivery date"],
    },
    OrderDate:{
        type: String,
        required: [true, "Missing order date"],
    },
    Last4Digits:{
        type: Number,
        required: [true, "Missing total price"],
        minlength: [4, "At least one digit is missing"],
        maxlength: [4, "At least one extra digit"],
    }
    },{
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

orderSchema.virtual("user", {
    ref: UserModel,
    localField: "userEmail",
    foreignField: "email",
    justOne: true
});
orderSchema.virtual("cart", {
    ref: ShoppingCartModel,
    localField: "cartID",
    foreignField: "_id",
    justOne: true
});

// 3. Model:
export const orderModel = model<IOrderModel>("orderModel", orderSchema, "orders");

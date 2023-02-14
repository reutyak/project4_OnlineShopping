// import {model, Schema, Document} from "mongoose";
// import { categoryModel } from "./categoryModel";

// export interface IProductModel extends Document{
//     nameProduct: string;
//     categoryID: Schema.Types.ObjectId;
//     price: number;
//     picture: string;
// };

// const productSchema = new Schema<IProductModel>({
//     nameProduct:{
//         type:String,
//         required:[true, "missing name"],
//         minlength:[2,"too short"],
//         maxlength:[10, "too long"],
//         trim:true,
//         unique:true
//     },
//     categoryID:{
//         type: Schema.Types.ObjectId,
//     },
//     price:{
//         type:Number,
//         required:[true, "missing price"],
//     },
//     picture:{
//         type:String,
//         required:[true, "missing picture"],

//     },
// },{
//     versionKey:false,
//     toJSON:{virtuals:true},
//     id:false
// });

// productSchema.virtual("category",{
//     ref:categoryModel,
//     localField:"categoryID",
//     foreignField:"_id",
//     justOne:true,
// })


// export const ProductModel = model<IProductModel>("ProductModel",productSchema,"products");
export default class productModel {
    _id: string;
    productName: string;
    productCategory: string;
    productPrice: number;
    productImage: string;
}
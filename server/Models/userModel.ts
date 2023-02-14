import { Hash } from "crypto";
import mongoose, { Document, model, ObjectId, Schema } from "mongoose";

// 1. Interface: 
export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    ID: string;
    password: string;
    city: string;
    street: string;
}

// 2. Schema: 
export const UserSchema = new Schema<IUserModel>({
    firstName: {
        type: String,
        required: [true, "Missing name"],
        minlength: [3, "Name too short"],
        maxlength: [50, "Name too long"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Missing last name"],
        minlength: [3, "last name too short"],
        maxlength: [50, "last name too long"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        minlength: [10, "Brief too short"],
        maxlength: [1000, "Brief too long"],
        trim: false,
        unique:true
    },
    ID: {
        type: String,
        required: [true, "Missing ID"],
        minlength: [6, "ID too short"],
        maxlength: [15, "ID too long"],
        trim: false,
        unique:true
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        // minlength: [8, "password to short"],
        // maxlength: [15, "password to long"]
    },
    city: {
        type: String,
        required: [true, "Missing city"],
        minlength: [3, "city to short"],
        maxlength: [15, "city to long"]
    },
    street: {
        type: String,
        required: [true, "Missing street"],
        minlength: [3, "street to short"],
        maxlength: [25, "street to long"]
    }},{
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

// BookSchema.virtual("genre", {
//     ref: GenreModel,
//     localField: "genreId",
//     foreignField: "_id",
//     justOne: true
// });

// 3. Model:
export const UserModel = model<IUserModel>("UserModel", UserSchema, "users");

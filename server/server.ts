import { IUserModel, UserModel } from './Models/userModel';
import  mongoose from 'mongoose';
//it's just example init you have to change as needed
// Main file in the SERVER 
import cors from "cors";
import express from "express";
import config from "./Utils/config";
import dotenv from "dotenv";
import ErrorHandler from "./middleware/route-not-found";
import productsController from "./Routes/productsController";
import connection from './Utils/dal';
import categoryController from './Routes/categoryController';
import dal from './Utils/dal';
import userController from './Routes/userController';
import shCartController from './Routes/shCartController';
import itemsController from './Routes/itemController';
import ordersController from './Routes/orderController';
var hash = require("object-hash");
dotenv.config(); 
const server = express();
const currentPort = process.env.PORT;

const myAdmin = {
    "firstName":process.env.ADMIN_NAME,
    "lastName":process.env.ADMIN_LAST_NAME,
    "email":process.env.ADMIN_EMAIL,
    "ID":process.env.ADMIN_ID,
    "password":hash(process.env.ADMIN_PASSWORD),
    "city":process.env.ADMIN_CITY,
    "street":process.env.ADMIN_STREET,
    "role":process.env.ADMIN_ROLE
}
const init=async ()=>{
    const user =await UserModel.find({email: process.env.ADMIN_EMAIL}).exec();
    if(!user[0]){
        new UserModel(myAdmin).save();
    }
};
init();
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", //expose which methods are allowed
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: "Authorization", //expose the Authorization header
  };
  server.use(cors(corsOptions));
server.use(express.json())
server.use("/product", productsController);
server.use("/category", categoryController);
server.use("/user", userController);
server.use("/cart", shCartController);
server.use("/item", itemsController);
server.use("/order", ordersController);
server.use("*", ErrorHandler);
// async function connection(){
//     // const client = new MongoClient(config.connectionString);
//     // await client.connect();
//     mongoose.set('strictQuery', false);
//     mongoose.connect(config.connectionString);
//     server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )
// };
// connection();
// server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )
server.listen(currentPort, async () => {
    await dal.connect();
    console.log(`Listening on http://localhost:${currentPort}`);
});

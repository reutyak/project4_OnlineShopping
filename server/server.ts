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
dotenv.config(); 
const server = express();
const currentPort = process.env.PORT;
server.use(express.json());
server.use(cors());
server.use("/product", productsController);
server.use("/category", categoryController);
server.use("/user", userController);
server.use("/cart", shCartController)
server.use("/item", itemsController)
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

import  mongoose from 'mongoose';
//it's just example init you have to change as needed
import { create_firstDBtable, create_secondDBtable } from "./Utils/init";
// Main file in the SERVER 
import cors from "cors";
import express from "express";
import config from "./Utils/config";
import dotenv from "dotenv";
// import dal_mysql from "./Utils/dal_mysql";
// import firstController from "./Routes/firstController";
// import secondController from "./Routes/secondController";
import ErrorHandler from "./middleware/route-not-found";
import productsController from "./Routes/productsController";
import connection from './Utils/dal';
// let db
// const {MongoClient} = require("mongodb");
dotenv.config(); 

// dal_mysql.execute(create_firstDBtable);
// dal_mysql.execute(create_secondDBtable);
const server = express();
const currentPort = process.env.PORT;
server.use(express.json());
server.use(cors());
server.use("/product", productsController)
// server.use("/second", secondController)
server.use("*", ErrorHandler);
// async function connection(){
//     // const client = new MongoClient(config.connectionString);
//     // await client.connect();
//     mongoose.set('strictQuery', false);
//     mongoose.connect(config.connectionString);
//     server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )
// };
connection();
server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )


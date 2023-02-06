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
let db
const {MongoClient} = require("mongodb");
dotenv.config(); 

// dal_mysql.execute(create_firstDBtable);
// dal_mysql.execute(create_secondDBtable);
const server = express();
const currentPort = process.env.PORT;
server.use(express.json());
server.use(cors());
// server.use("/first", firstController)
// server.use("/second", secondController)
server.use("*", ErrorHandler);
async function start(){
    const client = new MongoClient(config.connectionString);
    await client.connect();
    db = client.db();
    db.collection("products");
    server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )
};
start();
// server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )


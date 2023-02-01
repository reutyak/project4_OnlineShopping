//it's just example init you have to change as needed
import { create_firstDBtable, create_secondDBtable } from "./Utils/init";
// Main file in the SERVER 
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import config from "./Utils/config";
import dal_mysql from "./Utils/dal_mysql";
import firstController from "./Routes/firstController";
import secondController from "./Routes/secondController";

dal_mysql.execute(create_firstDBtable);
dal_mysql.execute(create_secondDBtable);
const server = express();
const currentPort = config.port;
server.use(express.json());
server.use(cors());
server.use("/first", firstController)
server.use("/second", secondController)
server.use("*", ErrorHandler);

server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )


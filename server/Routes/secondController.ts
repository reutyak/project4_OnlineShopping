// import express, { NextFunction, Request, Response } from "express";
// import secondLogic from "../Logic/secondLogic";

// const secondController = express.Router();

// //get full information from DB
// secondController.get("/all", async (request:Request, response: Response, next: NextFunction)=>{
//     response.status(200).json(await secondLogic.getAllSecond());
// });

// secondController.post("/", async (request:Request, response: Response, next: NextFunction)=>{
//     const data = request.body
//     response.status(201).json(await secondLogic.addSecond(data));
// });

// secondController.delete("/:id", async (request: Request, response: Response, next: NextFunction)=>{
//     const deleteID = +request.params.id
//     response.status(204).json(await secondLogic.deleteSecond(deleteID));
// });

// secondController.put("/", async(request: Request, response: Response, next: NextFunction)=>{
//     const data = request.body
//     response.status(201).json(await secondLogic.updateSecond(data));

// });


// export default secondController;



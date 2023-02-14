import { IUserModel } from './../Models/userModel';
// // All the routes that connect the the DB and client.
import usersLogic from "../Logic/usersLogic";
import express, { NextFunction, Request, Response } from "express";
var hash = require("object-hash");
const userController = express.Router();

userController.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await usersLogic.getAllUsers());
  }
);

userController.get(
  "/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const userID = request.params.id;
    try{
    const theUser = await usersLogic.getSingleUserByID(userID);
      response.status(200).json(theUser)
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }
);

userController.get(
    "/byEmail/:email",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userEmail = request.params.email;
        const user = await usersLogic.getUserByEmail(userEmail);
        return response.status(200).json(user);
    }
    catch (err: any) {
        next(err);
    }
  });
  
userController.post("/",async (request: Request, response: Response, next: NextFunction) => {
    try{ 
    const newUser:IUserModel = request.body;
    newUser.password = hash(newUser.password);
    console.log(newUser.password);
    console.log(newUser);
     response.status(201).json(await usersLogic.addUser(newUser));
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  })

  // delete information from DB
  userController.delete("/delete/:id", async (request: Request, response: Response, next: NextFunction) => {
  const idUser = request.params.id;
  try{
  response.status(204).json( await usersLogic.deleteUser(idUser))
  }catch(err){
    return response.status(400).json({
      success: false,
    });
  }
})


  //update value
  userController.put("/update/:id",async (request: Request, response: Response, next: NextFunction) => {
    const idUser = request.params.id;
    const updateUser =request.body;
    try{
response.status(201).json(await usersLogic.updateUser(idUser,updateUser));
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  })


export default userController;

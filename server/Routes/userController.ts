import { IUserModel } from "./../Models/userModel";
// // All the routes that connect the the DB and client.
import usersLogic from "../Logic/usersLogic";
import express, { NextFunction, Request, Response } from "express";
import {
  adminAuth,
  getExpFromJWT,
  getJWT,
  getUserEmailFromJWT,
  userAuth,
} from "../Utils/jwt";
var hash = require("object-hash");
const userController = express.Router();

userController.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    const detailsUser = request.body;
    const users = await usersLogic.getAllUsers();
    console.log(users);
    let checkMe = false;
    // console.log(admin);
    users.map(async (item) => {
      if (
        detailsUser.email === item.email &&
        hash(detailsUser.password) === item.password
      ) {
        detailsUser._id = item._id;
        detailsUser.role = item.role;
        console.log(detailsUser._id);
        checkMe = true;
      }
    });
    if (checkMe) {
      const token = await getJWT(
        detailsUser.email,
        detailsUser._id,
        detailsUser.role
      );
      console.log(token);
      //add token to the system...
      response.set("Authorization", `Bearer ${token}`);
      console.log("user email:", getUserEmailFromJWT(token));
      console.log("exp:", getExpFromJWT(token));
      response.status(202).json(detailsUser);
    } else {
      response.status(403).json(false);
    }
  }
);

userController.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    // if (adminAuth(request, response)) {
      response.status(200).json(await usersLogic.getAllUsers());
    // } else {
    //   response.status(401).json("You are no authorized!!!");
    }
  // }
);

userController.get(
  "/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const userID = request.params.id;
    if (adminAuth(request, response)){
    try {
      const theUser = await usersLogic.getSingleUserByID(userID);
      response.status(200).json(theUser);
    } catch (err) {
      return response.status(400).json({
        success: false,
      });
    }}else{response.status(401).json("You are no authorized!!!");}
  }
);

userController.get(
  "/byEmail/:email",
  async (request: Request, response: Response, next: NextFunction) => {
    if(adminAuth(request,response)){
    try {
      const userEmail = request.params.email;
      const user = await usersLogic.getUserByEmail(userEmail);
      return response.status(200).json(user);
    } catch (err: any) {
      next(err);
    }
  }else{response.status(401).json("You are no authorized!!!");}
});

userController.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const newUser: IUserModel = request.body;
      newUser.password = hash(newUser.password);
      const users = await usersLogic.getAllUsers();
      let exist = false;
      users.map(async (item) => {
        if (newUser.email === item.email) {
          response.status(400).json("this email exist in the system");
          exist = true;
        }
      });
      console.log(newUser.password);
      console.log(newUser);
      if ((exist = false)) {
        response.status(201).json(await usersLogic.addUser(newUser));
      }
    } catch (err) {
      return response.status(400).json({
        success: false,
      });
    }
  }
);

// delete information from DB
userController.delete(
  "/delete/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const idUser = request.params.id;
    if(adminAuth(request, response)){
    try {
      response.status(204).json(await usersLogic.deleteUser(idUser));
    } catch (err) {
      return response.status(400).json({
        success: false,
      });
    }
    }else{response.status(401).json("You are no authorized!!!");}}
);

//update value
userController.put(
  "/update/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const idUser = request.params.id;
    const updateUser = request.body;
    if(userAuth(request,response)){
    try {
      response
        .status(201)
        .json(await usersLogic.updateUser(idUser, updateUser));
    } catch (err) {
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}}
);

export default userController;

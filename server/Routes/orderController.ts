import { adminAuth, userAuth } from 'Utils/jwt';
// // All the routes that connect the the DB and client.
import orderLogic from "../Logic/orderLogic";
import { IOrderModel } from 'Models/orderModel';
import express, { NextFunction, Request, Response } from "express";

const ordersController = express.Router();

ordersController.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    if(adminAuth(request, response)){
    try{
    response.status(200).json(await orderLogic.getAllOrders());
    }catch{
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}}
);

ordersController.get(
  "/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const orderID = request.params.id;
    if(userAuth(request, response)){
    try{
    const theItem = await orderLogic.getSingleOrderByID(orderID)
      response.status(200).json(theItem)
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}}
);

ordersController.get(
  "/ByUserEmail/:UserEmail",
  async (request: Request, response: Response, next: NextFunction) => {
    if(userAuth(request,response)){
    try {
      const UserEmail = request.params.UserEmail;
      const orders = await orderLogic.getOrdersByUserEmail(UserEmail);
      return response.status(200).json(orders);
  }
  catch (err: any) {
      next(err);
  }
}else{response.status(401).json("You are no authorized!!!");}});

ordersController.get(
    "/ByDelDate/:date",
    async (request: Request, response: Response, next: NextFunction) => {
      if(adminAuth(request, response)){
      try {
        const delDate = request.params.date;
        const orders = await orderLogic.getOrdersByDelDate(delDate);
        return response.status(200).json(orders);
    }
    catch (err: any) {
        next(err);
    }
  }else{response.status(401).json("You are no authorized!!!");}});

ordersController.post("/",async (request: Request, response: Response, next: NextFunction) => {
  if(userAuth(request, response)){  
  try{ 
    const newOrder:IOrderModel = request.body;
    console.log(newOrder);
    const orderAdded = await orderLogic.addOrder(newOrder);
    response.status(201).json(orderAdded);
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}})

  // delete information from DB
  ordersController.delete("/delete/:id", async (request: Request, response: Response, next: NextFunction) => {
  const idOrder = request.params.id;
  if(adminAuth(request, response)){
  try{
  response.status(204).json( await orderLogic.deleteOrder(idOrder))
  }catch(err){
    return response.status(400).json({
      success: false,
    });
  }
}else{response.status(401).json("You are no authorized!!!");}})

  //update value
  ordersController.put("/update/:id",async (request: Request, response: Response, next: NextFunction) => {
    const idOrder = request.params.id;
    const updateOrder =request.body;
    if(userAuth(request,response)){
    try{
response.status(201).json(await orderLogic.updateOrder(idOrder,updateOrder));
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}})


export default ordersController;

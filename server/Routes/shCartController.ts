import { IShoppingCartModel } from 'Models/ShoppingCartModel';
// // All the routes that connect the the DB and client.
import shoppingCartLogic from "../Logic/shoppingCartLogic";
import express, { NextFunction, Request, Response } from "express";
import { adminAuth, userAuth } from '../Utils/jwt';

const shCartController = express.Router();

shCartController.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    if(adminAuth(request,response)){
    response.status(200).json(await shoppingCartLogic.getAllShCarts());
    }else{response.status(401).json("You are no authorized!!!");}
  }
);

shCartController.get(
  "/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const cartID = request.params.id;
    if(userAuth(request,response)){
    try{
    const theCart = await shoppingCartLogic.getSingleShCartByID(cartID);
      response.status(200).json(theCart)
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }}else{response.status(401).json("You are no authorized!!!");}
  }
);

shCartController.get(
    "/byEmail/:email",
    async (request: Request, response: Response, next: NextFunction) => {
      if(userAuth(request, response)){
      try {
        const userEmail = request.params.email;
        const cart = await shoppingCartLogic.getShCartByEmail(userEmail);
        return response.status(200).json(cart);
    }
    catch (err: any) {
        next(err);
    }}else{response.status(401).json("You are no authorized!!!");}
  });
  
  shCartController.post("/",async (request: Request, response: Response, next: NextFunction) => {
    // if(userAuth(request, response)){
    try{ 
    const newCart:IShoppingCartModel = request.body;
    const cart = shoppingCartLogic.addShCart(newCart);
     response.status(201).json(await cart);
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  // }else{response.status(401).json("You are no authorized!!!");}
})

  // delete information from DB
  shCartController.delete("/delete/:id", async (request: Request, response: Response, next: NextFunction) => {
  const idCart = request.params.id;
  if(userAuth(request, response)){
  try{
  response.status(204).json( await shoppingCartLogic.deleteShCart(idCart))
  }catch(err){
    return response.status(400).json({
      success: false,
    });
  }
}else{response.status(401).json("You are no authorized!!!");}})


  //update value
  shCartController.put("/update/:id",async (request: Request, response: Response, next: NextFunction) => {
    const idCart = request.params.id;
    const updateCart =request.body;
    if(userAuth(request,response)){
    try{
response.status(201).json(await shoppingCartLogic.updateShCart(idCart,updateCart));
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}})


export default shCartController;

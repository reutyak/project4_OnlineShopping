import { IShoppingCartModel } from 'Models/ShoppingCartModel';
// // All the routes that connect the the DB and client.
import shoppingCartLogic from "../Logic/shoppingCartLogic";
import express, { NextFunction, Request, Response } from "express";

const shCartController = express.Router();

shCartController.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await shoppingCartLogic.getAllShCarts());
  }
);

shCartController.get(
  "/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const cartID = request.params.id;
    try{
    const theCart = await shoppingCartLogic.getSingleShCartByID(cartID);
      response.status(200).json(theCart)
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }
);

shCartController.get(
    "/byEmail/:email",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const userEmail = request.params.email;
        const cart = await shoppingCartLogic.getShCartByEmail(userEmail);
        return response.status(200).json(cart);
    }
    catch (err: any) {
        next(err);
    }
  });
  
  shCartController.post("/",async (request: Request, response: Response, next: NextFunction) => {
    try{ 
    const newCart:IShoppingCartModel = request.body;
     response.status(201).json(await shoppingCartLogic.addShCart(newCart));
    }catch(err){
      return response.status(400).json({
        // success: false,
        err
      });
    }
  })

  // delete information from DB
  shCartController.delete("/delete/:id", async (request: Request, response: Response, next: NextFunction) => {
  const idCart = request.params.id;
  try{
  response.status(204).json( await shoppingCartLogic.deleteShCart(idCart))
  }catch(err){
    return response.status(400).json({
      success: false,
    });
  }
})


  //update value
  shCartController.put("/update/:id",async (request: Request, response: Response, next: NextFunction) => {
    const idCart = request.params.id;
    const updateCart =request.body;
    try{
response.status(201).json(await shoppingCartLogic.updateShCart(idCart,updateCart));
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  })


export default shCartController;

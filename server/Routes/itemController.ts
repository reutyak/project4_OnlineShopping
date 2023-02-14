// // All the routes that connect the the DB and client.
import express, { NextFunction, Request, Response } from "express";
import productsLogic from "../Logic/productsLogic";
import itemLogic from "../Logic/itemLogic";
import { IItemModel } from "Models/itemModel";

const itemsController = express.Router();

itemsController.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try{
    response.status(200).json(await itemLogic.getAllItems());
    }catch{
      return response.status(400).json({
        success: false,
      });
    }
  }
);

itemsController.get(
  "/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const itemID = request.params.id;
    try{
    const theItem = await itemLogic.getSingleItemByID(itemID);
      response.status(200).json(theItem)
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }
);

itemsController.get(
  "/ByProductId/:productId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const productId = request.params.productId;
      const items = await itemLogic.getItemsByProductId(productId);
      return response.status(200).json(items);
  }
  catch (err: any) {
      next(err);
  }
});

itemsController.get(
    "/ByCartId/:cartId",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const cartId = request.params.cartId;
        const items = await itemLogic.getItemsByCartId(cartId);
        return response.status(200).json(items);
    }
    catch (err: any) {
        next(err);
    }
  });

itemsController.post("/",async (request: Request, response: Response, next: NextFunction) => {
    try{ 
    const newItem:IItemModel = request.body;
    console.log(newItem);
    const itemAdded = await itemLogic.addItem(newItem);
    console.log(itemAdded);
    response.status(201).json(itemAdded);
    }catch(err){
      return response.status(400).send(
        // success: false,
        err);
    }
  })

  // delete information from DB
  itemsController.delete("/delete/:id", async (request: Request, response: Response, next: NextFunction) => {
  const idItem = request.params.id;
  try{
  response.status(204).json( await itemLogic.deleteItem(idItem))
  }catch(err){
    return response.status(400).json({
      success: false,
    });
  }
})

  //update value
  itemsController.put("/update/:id",async (request: Request, response: Response, next: NextFunction) => {
    const idItem = request.params.id;
    const updateItem =request.body;
    try{
response.status(201).json(await itemLogic.updateItem(idItem,updateItem));
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  })


export default itemsController;

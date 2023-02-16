import { userAuth, adminAuth } from 'Utils/jwt';
// // All the routes that connect the the DB and client.
import express, { NextFunction, Request, Response } from "express";
import productsLogic from "../Logic/productsLogic";

const productsController = express.Router();

productsController.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try{
    response.status(200).json(await productsLogic.getAllProducts());
    }catch{
      return response.status(400).json({
        success: false,
      });
    }
  }
);

productsController.get(
  "/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const productID = request.params.id;
    try{
    const theProduct = await productsLogic.getSingleProductByID(productID);
      response.status(200).json(theProduct)
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }
);

productsController.get(
  "/byCategory/:productCategory",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const productCategory = request.params.productCategory;
      const products = await productsLogic.getProductByCategory(productCategory);
      console.log(products);
      return response.status(200).json(products);
  }
  catch (err: any) {
      next(err);
  }
});

  productsController.post("/",async (request: Request, response: Response, next: NextFunction) => {
    if(adminAuth(request,response)){
    try{ 
    const newProduct = request.body;
     response.status(201).json(await productsLogic.addProduct(newProduct));
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}})

  // delete information from DB
  productsController.delete("/delete/:id", async (request: Request, response: Response, next: NextFunction) => {
  const idProd = request.params.id;
  if(adminAuth(request, response)){
  try{
  response.status(204).json( await productsLogic.deleteProduct(idProd))
  }catch(err){
    return response.status(400).json({
      success: false,
    });
  }
}else{response.status(401).json("You are no authorized!!!");}})

  //update value
  productsController.put("/update/:id",async (request: Request, response: Response, next: NextFunction) => {
    const idProd = request.params.id;
    const updateProduct =request.body;
    if(adminAuth(request,response)){
    try{
response.status(201).json(await productsLogic.updateProduct(idProd,updateProduct));
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}})


export default productsController;

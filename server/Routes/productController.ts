// // All the routes that connect the the DB and client.
import express, { NextFunction, Request, Response } from "express";
import productsLogic from "../Logic/productsLogic";

const productsController = express.Router();

productsController.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await productsLogic.getAllProducts());
  }
);

productsController.get(
  "/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const productID = request.params.id;
    response.status(200).json(await productsLogic.getSingleProductByID(productID));
  }
);

  productsController.post("/",async (request: Request, response: Response, next: NextFunction) => {
     const newProduct = request.body;
     response.status(201).json(await productsLogic.addProduct(newProduct));
  })

  // delete information from DB
  productsController.delete("/delete/:id", async (request: Request, response: Response, next: NextFunction) => {
  const idProd = request.params.id;
  response.status(204).json( await productsLogic.deleteProduct(idProd))
})

  //update value
  productsController.put("/update/:id",async (request: Request, response: Response, next: NextFunction) => {
    const idProd = request.params.id;
    const updateProduct =request.body;
response.status(201).json(await productsLogic.updateProduct(idProd,updateProduct));
  })


export default productsController;

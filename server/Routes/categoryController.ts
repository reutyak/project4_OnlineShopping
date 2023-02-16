import { adminAuth } from 'Utils/jwt';
// // All the routes that connect the the DB and client.
import express, { NextFunction, Request, Response } from "express";
import productsLogic from "../Logic/productsLogic";
import categoryLogic from "../Logic/categoryLogic";

const categoryController = express.Router();

categoryController.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    if(adminAuth(request,response)){
    response.status(200).json(await categoryLogic.getAllCategories());
  }else{response.status(401).json("You are no authorized!!!");}}
);

categoryController.get(
  "/single/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const categoryID = request.params.id;
    if(adminAuth(request,response)){
    try{
    const theCategory = await categoryLogic.getSingleCategoryByID(categoryID);
      response.status(200).json(theCategory)
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}}
);

categoryController.post("/",async (request: Request, response: Response, next: NextFunction) => {
  if(adminAuth(request,response)){  
  try{ 
    const newCategory = request.body;
     response.status(201).json(await categoryLogic.addCategory(newCategory));
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}})

  // delete information from DB
  categoryController.delete("/delete/:id", async (request: Request, response: Response, next: NextFunction) => {
  const idCategory = request.params.id;
  if(adminAuth(request,response)){
  try{
  response.status(204).json( await categoryLogic.deleteCategory(idCategory))
  }catch(err){
    return response.status(400).json({
      success: false,
    });
  }
}else{response.status(401).json("You are no authorized!!!");}})


  //update value
  categoryController.put("/update/:id",async (request: Request, response: Response, next: NextFunction) => {
    const idCategory = request.params.id;
    const updateCategory =request.body;
    if(adminAuth(request,response)){
    try{
response.status(201).json(await categoryLogic.updateCategory(idCategory,updateCategory));
    }catch(err){
      return response.status(400).json({
        success: false,
      });
    }
  }else{response.status(401).json("You are no authorized!!!");}})


export default categoryController;

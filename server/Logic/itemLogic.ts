import mongoose from 'mongoose';
import { IItemModel, itemModel } from '../Models/itemModel';
const products = require('../schema/productSchema');

// // functions( async / await ) for getting data from DB
const getAllItems = async (): Promise<IItemModel[]> => {
    return await itemModel.find().populate("product").populate("cart").exec();
     ;
}


const getSingleItemByID = async (_id: string): Promise<IItemModel> => {
    const item = await itemModel.findById(_id).exec();
    // if (!product) throw new IdNotFoundError(id)
    if (!item){
        return
    }else{
        return item;
    }
}

const getItemsByProductId = async (Id:string):Promise<IItemModel[]>=>{
    const items =await itemModel.find({productId: Id}).populate("product").exec();
    return items
};

const getItemsByCartId = async (Id:string):Promise<IItemModel[]>=>{
    const items =await itemModel.find({CartID: Id}).populate("product").exec();
    return items
};


const addItem = async (item:IItemModel):Promise<IItemModel>=>{
    return await new itemModel(item).save();
}

const updateItem = async(_id:any,item:IItemModel):Promise<IItemModel>=>{
    // const errors = product.validateSync();
    // if (errors) throw new ValidationError(errors.message);
    const updateItem = await itemModel.findByIdAndUpdate(_id,item,{returnOriginal:false}).exec();
    // if (!updateProduct) throw new IdNotFoundError(product._id)
    return updateItem
}

const deleteItem = async (_id:string):Promise<void>=>{
    const itemDelete = await itemModel.findByIdAndDelete(_id).exec();
    // if (!productDelete) throw new IdNotFoundError(_id);
}

// // exporting 
export default {
    getAllItems,
    getSingleItemByID,
    getItemsByProductId,
    getItemsByCartId,
    addItem,
    updateItem,
    deleteItem
}
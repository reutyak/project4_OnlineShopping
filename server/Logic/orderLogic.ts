import { IOrderModel, orderModel } from '../Models/orderModel';
import mongoose from 'mongoose';

// // functions( async / await ) for getting data from DB
const getAllOrders = async (): Promise<IOrderModel[]> => {
    return await orderModel.find().populate("user").populate("cart").exec();
     ;
}


const getSingleOrderByID = async (_id: string): Promise<IOrderModel> => {
    const order = await orderModel.findById(_id).exec();
    // if (!product) throw new IdNotFoundError(id)
    if (!order){
        return
    }else{
        return order;
    }
}

const getOrdersByUserEmail = async (email:string):Promise<IOrderModel[]>=>{
    const orders =await orderModel.find({userEmail: email}).populate("user").exec();
    return orders
};

const getOrdersByDelDate = async (date:string):Promise<IOrderModel[]>=>{
    const items =await orderModel.find({DeliveryDate: date}).populate("user").exec();
    return items
};


const addOrder = async (order:IOrderModel):Promise<IOrderModel>=>{
    return await new orderModel(order).save();
}

const updateOrder = async(_id:any,order:IOrderModel):Promise<IOrderModel>=>{
    // const errors = product.validateSync();
    // if (errors) throw new ValidationError(errors.message);
    const updateOrder = await orderModel.findByIdAndUpdate(_id,order,{returnOriginal:false}).exec();
    // if (!updateProduct) throw new IdNotFoundError(product._id)
    return updateOrder
}

const deleteOrder = async (_id:string):Promise<void>=>{
    const itemDelete = await orderModel.findByIdAndDelete(_id).exec();
    // if (!productDelete) throw new IdNotFoundError(_id);
}

// // exporting 
export default {
    getAllOrders,
    getSingleOrderByID,
    getOrdersByDelDate,
    getOrdersByUserEmail,
    addOrder,
    updateOrder,
    deleteOrder
}
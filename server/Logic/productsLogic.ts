import { IdNotFoundError, ValidationError } from '../Models/client-errors';
import productModel from '../Models/productModel';
const products = require('../schema/productSchema');

// // functions( async / await ) for getting data from DB
const getAllProducts = async (): Promise<productModel[]> => {
    return await products.find()
     ;
}


const getSingleProductByID = async (id: string): Promise<productModel> => {
    const product = await products.findById(id).exec();
    // if (!product) throw new IdNotFoundError(id)
    if (!product){
        return
    }else{
        return product;
    }
}

const addProduct = async (product:productModel):Promise<productModel>=>{
    return await new products(product).save();
}

const updateProduct = async(_id:any,product:productModel):Promise<productModel>=>{
    // const errors = product.validateSync();
    // if (errors) throw new ValidationError(errors.message);
    const updateProduct = await products.findByIdAndUpdate(_id,product,{returnOriginal:false}).exec();
    // if (!updateProduct) throw new IdNotFoundError(product._id)
    return updateProduct
}

const deleteProduct = async (_id:string):Promise<void>=>{
    const productDelete = await products.findByIdAndDelete(_id).exec();
    // if (!productDelete) throw new IdNotFoundError(_id);
}

// // exporting 
export default {
    getAllProducts,
    getSingleProductByID,
    addProduct,
    updateProduct,
    deleteProduct
}
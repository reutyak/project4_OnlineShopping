import { IdNotFoundError, ValidationError } from '../Models/client-errors';
import { IProductModel, ProductModel } from './../Models/productModel';



// // functions( async / await ) for getting data from DB
const getAllProducts = async (): Promise<IProductModel[]> => {
    return ProductModel.find().populate("category").exec()
     ;
}

const getSingleProductByID = async (id: string): Promise<IProductModel> => {
    const product = await ProductModel.findById(id).exec();
    if (!product) throw new IdNotFoundError(id)
    return product;
}

const addProduct = (product:IProductModel):Promise<IProductModel>=>{
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);
    return product.save()
}

const updateProduct = async(_id:any,product:IProductModel):Promise<IProductModel>=>{
    const errors = product.validateSync();
    if (errors) throw new ValidationError(errors.message);
    const updateProduct = await ProductModel.findByIdAndUpdate(_id,product,{returnOriginal:false}).exec();
    if (!updateProduct) throw new IdNotFoundError(product._id)
    return updateProduct
}

const deleteProduct = async (_id:string):Promise<void>=>{
    const productDelete = await ProductModel.findByIdAndDelete(_id).exec();
    if (!productDelete) throw new IdNotFoundError(_id);
}

// // exporting 
export default {
    getAllProducts,
    getSingleProductByID,
    addProduct,
    updateProduct,
    deleteProduct
}
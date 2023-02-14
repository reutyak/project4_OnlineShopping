import categoryModel from 'Models/categoryModel';
import productModel from '../Models/productModel';
const categories = require('../schema/categorySchema');

// // functions( async / await ) for getting data from DB
const getAllCategories = async (): Promise<categoryModel[]> => {
    return await categories.find().exec();
     ;
}


const getSingleCategoryByID = async (id: string): Promise<productModel> => {
    const category = await categories.findById(id).exec();
    // if (!product) throw new IdNotFoundError(id)
    // if (!category){
    //     return
    // }else{
        return category;
    // }
}

const addCategory = async (category:categoryModel):Promise<productModel>=>{
    return await new categories(category).save();
}

const updateCategory = async(_id:any,category:categoryModel):Promise<productModel>=>{
    // const errors = product.validateSync();
    // if (errors) throw new ValidationError(errors.message);
    const updateCategory = await categories.findByIdAndUpdate(_id,category,{returnOriginal:false}).exec();
    // if (!updateProduct) throw new IdNotFoundError(product._id)
    return updateCategory
}

const deleteCategory = async (_id:string):Promise<void>=>{
    const productDelete = await categories.findByIdAndDelete(_id).exec();
    // if (!productDelete) throw new IdNotFoundError(_id);
}

// // exporting 
export default {
    getAllCategories,
    getSingleCategoryByID,
    addCategory,
    updateCategory,
    deleteCategory
}
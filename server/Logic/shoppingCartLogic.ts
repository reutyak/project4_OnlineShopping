import { IShoppingCartModel, ShoppingCartModel } from "../Models/ShoppingCartModel";


// // functions( async / await ) for getting data from DB
const getAllShCarts = async (): Promise<IShoppingCartModel[]> => {
    return await ShoppingCartModel.find().populate("CustomerID").exec();
     ;
}


const getSingleShCartByID = async (_id: string): Promise<IShoppingCartModel> => {
    const myShCarts = await ShoppingCartModel.findById(_id).populate("CustomerID").exec();
    // if (!product) throw new IdNotFoundError(id)
    // if (!category){
    //     return
    // }else{
        return myShCarts;
    // }
}

const getShCartByEmail = async (userEmail:string):Promise<IShoppingCartModel[]>=>{
    const user =await ShoppingCartModel.find({userName: userEmail}).populate("CustomerID").exec();
    return user
};

const addShCart = async (ShCarts:IShoppingCartModel):Promise<IShoppingCartModel>=>{
    return await new ShoppingCartModel(ShCarts).save();
}

const updateShCart = async(_id:any,ShCarts:IShoppingCartModel):Promise<IShoppingCartModel>=>{
    // const errors = product.validateSync();
    // if (errors) throw new ValidationError(errors.message);
    const updateShCarts = await ShoppingCartModel.findByIdAndUpdate(_id,ShCarts,{returnOriginal:false}).exec();
    // if (!updateProduct) throw new IdNotFoundError(product._id)
    return updateShCarts
}

const deleteShCart = async (_id:string):Promise<void>=>{
    console.log(_id);
    const shCartsDelete = await ShoppingCartModel.findByIdAndDelete(_id).exec();
    // if (!productDelete) throw new IdNotFoundError(_id);
}

// // exporting 
export default {
    getAllShCarts,
    getSingleShCartByID,
    getShCartByEmail,
    addShCart,
    updateShCart,
    deleteShCart
}
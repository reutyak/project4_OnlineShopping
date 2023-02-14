import { IUserModel, UserModel } from './../Models/userModel';


// // functions( async / await ) for getting data from DB
const getAllUsers = async (): Promise<IUserModel[]> => {
    return await UserModel.find().exec();
     ;
}


const getSingleUserByID = async (id: string): Promise<IUserModel> => {
    const myUser = await UserModel.findById(id).exec();
    // if (!product) throw new IdNotFoundError(id)
    // if (!category){
    //     return
    // }else{
        return myUser;
    // }
}

const getUserByEmail = async (userEmail:string):Promise<IUserModel[]>=>{
    const user =await UserModel.find({email: userEmail}).exec();
    return user
};

const addUser = async (user:IUserModel):Promise<IUserModel>=>{
    return await new UserModel(user).save();
}

const updateUser = async(_id:any,user:IUserModel):Promise<IUserModel>=>{
    // const errors = product.validateSync();
    // if (errors) throw new ValidationError(errors.message);
    const updateUser = await UserModel.findByIdAndUpdate(_id,user,{returnOriginal:false}).exec();
    // if (!updateProduct) throw new IdNotFoundError(product._id)
    return updateUser
}

const deleteUser = async (_id:string):Promise<void>=>{
    console.log(_id);
    const userDelete = await UserModel.findByIdAndDelete(_id).exec();
    // if (!productDelete) throw new IdNotFoundError(_id);
}

// // exporting 
export default {
    getAllUsers,
    getSingleUserByID,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
}
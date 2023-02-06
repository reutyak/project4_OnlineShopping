import mongoose from "mongoose";
import config from "./config";

const connect = async():Promise<void>=>{
    try{
        const db = await mongoose.connect(config.connectionString);
        console.log("connect "+db.connection[0].name);
    }catch(err:any){
        console.log(err);

    }
}
export default {connect};


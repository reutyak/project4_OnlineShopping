import react from "react";
import axios from "axios";
import { ItemModel } from '../Model/itemModel';

// dotenv.config(); 
const port = process.env.SERVER_PORT;



const addItems = async(items:ItemModel[])=>{
  axios.post(`http://localhost:3001/item/`,items).then(async (response)=>{
    items = response.data
    const currentToken = await response.headers["authorization"];
        localStorage.setItem("myToken", currentToken);
  })
  return items
};

const getItemsByCart = async(_id:string)=>{
    let myItems:[] = [];
  axios.get(`http://localhost:3001/item/ByCartId/${_id}`).then(async (response)=> {myItems=(response.data)}).then(()=>sessionStorage.setItem("itemsOrder",JSON.stringify(myItems)))
  return myItems
}



export default {
    addItems,
  getItemsByCart
};



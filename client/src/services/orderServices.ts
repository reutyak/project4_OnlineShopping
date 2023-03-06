import axios from "axios";
import orderModel from "../Model/orderModel";

const addOrder = async(order:orderModel) =>{
    let myOrder = "";
// cart = {
//     userName:"mg9072390@gmail.com",
//     date: "2023-02-13T09:00:00:000000Z"
//   }
    axios.post(`http://localhost:3001/order/`,order).then(async (response) => {
        myOrder = await response.data;
        // console.log(IDcart);
        // localStorage.setItem("cart", IDcart);
        // localStorage.setItem("date",await response.data.date);
        const currentToken = await response.headers["authorization"];
        localStorage.setItem("myToken", currentToken);
        localStorage.setItem("myCart", JSON.stringify(response.data));


    });
    return myOrder

};

export default {addOrder}
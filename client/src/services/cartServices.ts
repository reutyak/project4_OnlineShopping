import { CartModel } from '../Model/cartModel';
import axios from "axios";
import { categoryModel } from "../Model/categoryModel";
import { store } from "../redux/store";
import { addCategoryST, deleteCategoryST, getAllCategoriesST, updateCategoryST } from "../redux/categoryState";
const myCurrentToken = localStorage.getItem("myToken");
axios.defaults.headers.common = {'Authorization': myCurrentToken}

// const getAllCategories = () =>{
//     let categories: categoryModel[] = [];
//   axios
//     .get(`http://localhost:3001/category/all`)
//     .then(async (response) => {
//         categories =  response.data;
//         store.dispatch(getAllCategoriesST(categories))
//         // const currentToken = await response.headers["authorization"];
//         // localStorage.setItem("myToken", currentToken);
//     });
//     return categories
// };

const addCart = async(cart: CartModel) =>{
    let IDcart = "";
// cart = {
//     userName:"mg9072390@gmail.com",
//     date: "2023-02-13T09:00:00:000000Z"
//   }
    axios.post(`http://localhost:3001/cart/`,cart).then(async (response) => {
        // IDcart = await response.data._id;
        // console.log(IDcart);
        // localStorage.setItem("cart", IDcart);
        // localStorage.setItem("date",await response.data.date);
        const currentToken = await response.headers["authorization"];
        localStorage.setItem("myToken", currentToken);
        localStorage.setItem("myCart", JSON.stringify(response.data));


    });
    return IDcart

};

// const getCategoryByID = (ID:string)=>{
//     let category = {};
//     axios.get(`http://localhost:3001/category/single/${ID}`).then(
//         async (response) => {
//             category =  response.data;
//             // const currentToken = await response.headers["authorization"];
//             // localStorage.setItem("myToken", currentToken);
//             // store.dispatch(updateProductsST(productToUpdate));
//         })
//         return category;
// }

// const updateCategory = (_id:string, upCate: categoryModel)=>{
//     let upCategory = {};
//     axios.put(`http://localhost:3001/category/update/${_id}`,upCate).then(
//         async (response) => {
//             upCategory =  response.data;
//             const currentToken = await response.headers["authorization"];
//             localStorage.setItem("myToken", currentToken);
//             store.dispatch(updateCategoryST(_id, upCategory));
//         })
//         return upCategory;
// }

// const deleteCategory = (_id:string)=>{
//     axios.delete(`http://localhost:3001/category/delete/${_id}`).then(
//         async (response) => {
//             const currentToken = await response.headers["authorization"];
//             localStorage.setItem("myToken", currentToken);
//             store.dispatch(deleteCategoryST(_id));
//         }
//     )
// }


export default {
    addCart
}
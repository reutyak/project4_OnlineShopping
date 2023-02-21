import { addProductsST, deleteProductsST, getAllProductsST, updateProductsST } from '../redux/productState';
import { store } from '../redux/store';
import { productModel } from './../Model/productModel';
import axios from "axios";

const getAllProducts = () =>{
    let products: any[] = [];
  axios
    .get(`http://localhost:3001/product/all`)
    .then(async (response) => {
        products =  response.data;
        store.dispatch(getAllProductsST(products))
        // const currentToken = await response.headers["authorization"];
        // localStorage.setItem("myToken", currentToken);
    });
    return products
};

const addProduct = (product: productModel) =>{
    let newProduct = {};
    axios.post(`http://localhost:3001/product`,product).then(async (response) => {
        newProduct =  response.data;
        const currentToken = await response.headers["authorization"];
        localStorage.setItem("myToken", currentToken);
        store.dispatch(addProductsST(newProduct));
    });
    return newProduct
};

const getProductByID = (ID:string)=>{
    let productToUpdate = {};
    axios.get(`http://localhost:3001/product/single/${ID}`).then(
        async (response) => {
            productToUpdate =  response.data;
            const currentToken = await response.headers["authorization"];
            localStorage.setItem("myToken", currentToken);
            // store.dispatch(updateProductsST(productToUpdate));
        })
        return productToUpdate;
}

const updateProduct = (_id:string, upProd: productModel)=>{
    let upProduct = {};
    axios.put(`http://localhost:3001/product/update/${_id}`,upProd).then(
        async (response) => {
            upProduct =  response.data;
            const currentToken = await response.headers["authorization"];
            localStorage.setItem("myToken", currentToken);
            store.dispatch(updateProductsST(upProduct));
        })
        return upProduct;
}

const deleteProduct = (_id:string)=>{
    axios.delete(`http://localhost:3001/product/delete/${_id}`).then(
        async (response) => {
            const currentToken = await response.headers["authorization"];
            localStorage.setItem("myToken", currentToken);
            store.dispatch(deleteProductsST(_id));
        }
    )
}

export default {
    getAllProducts,
    addProduct,
    getProductByID,
    updateProduct,
    deleteProduct
}
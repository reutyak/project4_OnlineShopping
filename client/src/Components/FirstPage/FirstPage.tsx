import { useEffect, useState } from "react";
import Advertisement from "../Advertisement/Advertisement";
import Information from "../Information/Information";
import Login from "../Login/Login";
import "./FirstPage.css";
import { productModel } from "../../Model/productModel";
import productServices from "../../services/productServices";
import categoryServices from "../../services/categoryServices";
import { categoryModel } from "../../Model/categoryModel";
import { store } from "../../redux/store";
import userServices from "../../services/userServices";

function FirstPage(): JSX.Element {
    const[products, setProducts]=useState<productModel[]>(store.getState().productState.productsST)
const [categories, setCategories]= useState<categoryModel[]>(store.getState().categoryState.categoriesST);

useEffect(() => {
  localStorage.setItem("myToken", "");
  localStorage.setItem("email", "");
  localStorage.setItem("role", "");
  localStorage.setItem("userName","guest")
}, []);

    useEffect(() => {
          const myProducts = productServices.getAllProducts();
          setProducts(myProducts);
      }, []);

      useEffect(() => {
        userServices.getAllUsers();
    }, []);

      useEffect(() => {
        if (categories.length===0) {
          const myCategories = categoryServices.getAllCategories();
          setCategories(myCategories);
        }else{}
      }, []);

      
      
    return (
        <div className="FirstPage">
			<div className="Login"><Login/></div>
            <div className="Advert"><Advertisement/></div>
            <div className="Information"><Information/></div>
        </div>
    );
}

export default FirstPage;

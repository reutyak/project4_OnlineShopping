import { useEffect, useState } from "react";
import "./User.css";
import { productModel } from "../../Model/productModel";
import { store } from "../../redux/store";
import productServices from "../../services/productServices"
import { categoryModel } from "../../Model/categoryModel";
import categoryServices from "../../services/categoryServices"
function User(): JSX.Element {
const[products, setProducts]=useState<productModel[]>(store.getState().productState.productsST)
const [categories, setCategories]= useState<categoryModel[]>(store.getState().categoryState.categoriesST);

    useEffect(() => {
          const myProducts = productServices.getAllProducts();
          setProducts(myProducts);
      }, []);

      useEffect(() => {
        if (categories.length===0) {
          const myCategories = categoryServices.getAllCategories();
          setCategories(myCategories);
        }else{}
      }, []);
      
      return (
        <div className="User">
			
        </div>
    );
}

export default User;

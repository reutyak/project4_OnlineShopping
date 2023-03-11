import { useState } from "react";
import { categoryModel } from "../../Model/categoryModel";
import ProductList from "../ProductList/ProductList";
import SearchResult from "../SearchResult/SearchResult";
import "./View1.css";

function View1(props:categoryModel): JSX.Element {
    const [searchS, setSearchS] = useState(sessionStorage.getItem("search"));

    const view1 = (category:categoryModel)=>{
        if(searchS){
            return <SearchResult/>

        
        }else{
            return <>
        <ProductList _id={category._id} categoryName={category.categoryName}/>
        </>
        }};
    return (
        <div className="View1">
			{view1(props)}
        </div>
    );
}

export default View1;

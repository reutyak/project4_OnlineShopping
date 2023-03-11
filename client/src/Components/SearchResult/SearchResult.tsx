import "./SearchResult.css";
import { useNavigate } from "react-router-dom";
import ModalAuth from "../ModalAuth/ModalAuth";
import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import { productModel } from "../../Model/productModel";
import productServices from "../../services/productServices";
import { getAllProductsST } from "../../redux/productState";
import {
  Pagination,
} from "@mui/material";
import { categoryModel } from "../../Model/categoryModel";
import React from "react";
import { ItemModel } from "../../Model/itemModel";
import SingleCard from "../SingleCard/SingleCard";
function SearchResult(): JSX.Element {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
  
    const [products, setProducts] = useState<productModel[]>(
      store
        .getState()
        .productState.productsST.filter(
          (item) => item.productName.includes(store.getState().SearchState.SearchST)
        )
    );
  
    
    const [items, setItems] = useState<ItemModel[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(8);
    const [categories, setCategories] = useState<categoryModel[]>(
      store.getState().categoryState.categoriesST
    );
  
    const pageCount = Math.ceil(products.length / cardsPerPage);
    // sessionStorage.getItem("search")?setProducts(
      // store
      //     .getState()
      //     .productState.productsST.filter(
      //       (item) => item.productName.includes(sessionStorage.getItem("search")||"")
      //     )
    // ):console.log("non");
  // useEffect(()=>{
  // setProducts(
  //   store
  //       .getState()
  //       .productState.productsST.filter(
  //         (item) => item.productName.includes(sessionStorage.getItem("search")||"")
  //       )
  // )
  //   },[currentPage])
    useEffect(() => {
      let myProducts = productServices.getAllProducts();
      store.dispatch(getAllProductsST(myProducts));
    }, [currentPage]);
  
    
    //   const sortedProducts = products.sort(
    //     (objA, objB) =>
    //       new Date(objB.start_date).getTime() - new Date(objA.start_date).getTime()
    //   );
    // Get currCards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);
  
    // Change page
    const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  
    const handleChange = (event: any, value: any) => {
      setCurrentPage(value);
    };
  
    const modalUp = () => {
      if (modalShow === true) {
        return (
          <ModalAuth
            show={modalShow}
            onHide={() => {
              setModalShow(false);
              navigate("/");
            }}
          />
        );
      }
    };
    return (
        <div className="SearchResult">
      <div>{modalUp()}</div>
      <div className="displayCard">
        <div className="card">
          {currentCards
            // .filter(
            //   (item: { productCategory: string }) =>
            //     item.productCategory === props._id
            // )
            .map((item) => (
              <div className="Single">
                <SingleCard
                  _id={item._id}
                  productName={item.productName}
                  productCategory={item.productCategory}
                  productPrice={item.productPrice}
                  productImage={item.productImage}
                />
              </div>
            ))}
        </div>
      </div>

      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
}


export default SearchResult;

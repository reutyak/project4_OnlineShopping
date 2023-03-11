import { useNavigate } from "react-router-dom";
import ModalAuth from "../ModalAuth/ModalAuth";
import "./ProductList.css";
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


function ProductList(props: categoryModel): JSX.Element {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const [products, setProducts] = useState<productModel[]>(
    store
      .getState()
      .productState.productsST.filter(
        (item) => item.productCategory === props._id
      )
  );

  
  const [items, setItems] = useState<ItemModel[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(8);
  const [categories, setCategories] = useState<categoryModel[]>(
    store.getState().categoryState.categoriesST
  );

  const pageCount = Math.ceil(products.length / cardsPerPage);
  
  useEffect(() => {
    let myProducts = productServices.getAllProducts();
    store.dispatch(getAllProductsST(myProducts));
  }, [currentPage]);

  
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

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
    <div className="ProductList">
      <div>{modalUp()}</div>
      <div className="displayCard">
        <div className="card">
          {currentCards
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

export default ProductList;

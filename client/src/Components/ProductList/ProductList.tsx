import { useNavigate } from "react-router-dom";
import ModalAuth from "../ModalAuth/ModalAuth";
import "./ProductList.css";
import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import { productModel } from "../../Model/productModel";
import productServices from "../../services/productServices";
import { getAllProductsST } from "../../redux/productState";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  Pagination,
  Typography,
} from "@mui/material";
import { categoryModel } from "../../Model/categoryModel";
import React from "react";

import ModalRemove from "../ModalRemove/ModalRemove";
import ModalAdd from "../ModalAdd/ModalAdd";
import { ItemModel } from "../../Model/itemModel";
import AddRemoveItem from "../AddRemoveItem/AddRemoveItem";
import SingleCard from "../SingleCard/SingleCard";
const addItem = (productID:string)=>{

};

const removeItem = ()=>{
  
};

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
  const [cardsPerPage] = useState(15);
  const [categories, setCategories] = useState<categoryModel[]>(
    store.getState().categoryState.categoriesST
  );

  const pageCount = Math.ceil(products.length / cardsPerPage);

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
    <div className="ProductList">
      <div>{modalUp()}</div>
      <div className="displayCard">
        <div className="card">
          {currentCards
            .filter((item: { productCategory: string; }) => item.productCategory === props._id)
            .map((item) => (<div className="Single"><SingleCard _id={item._id} productName={item.productName} productCategory={item.productCategory} productPrice={item.productPrice} productImage={item.productImage}/></div>
              // <Card variant="outlined" sx={{ width: "20%" }}>
              //   {/* <React.Fragment > */}
              //   <CardContent>
              //     <Typography
              //       sx={{ fontSize: 14 }}
              //       color="text.secondary"
              //       gutterBottom
              //     >
              //       {
              //         categories.filter(
              //           (category) => category._id === item.productCategory
              //         )[0].categoryName
              //       }{" "}
              //     </Typography>
              //     <Typography variant="h5" component="div">
              //       {item.productName}{" "}
              //     </Typography>
              //     <Typography sx={{ mb: 1.5 }} color="text.secondary">
              //       {item.productPrice}&#36;{" "}
              //     </Typography>
              //     <Typography variant="body2">
              //       <img
              //         className="image"
              //         src={item.productImage}
              //         alt="img"
              //         style={{ height: 150 }}
              //       />
              //     </Typography>
              //   </CardContent>

              //   <CardActions>
              //     <AddRemoveItem productId={item._id} amount={0}  CartID={JSON.parse(localStorage.myCart)._id} price={item.productPrice} totalPrice={0} />
                  
              //   </CardActions>
              //   {/* </React.Fragment> */}
              // </Card>
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

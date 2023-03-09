import "./OneItem.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AddRemoveItem from "../AddRemoveItem/AddRemoveItem";
import { store } from "../../redux/store";
import { useState } from "react";
import { categoryModel } from "../../Model/categoryModel";
import { productModel } from "../../Model/productModel";
import TotalP from "../TotalP/TotalP";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemsST, deleteItemsST } from "../../redux/itemsState";
import { ItemModel } from "../../Model/itemModel";
import Amount from "../Amount/Amount";

function OneItem(props: productModel): JSX.Element {
  const state = sessionStorage.getItem("state");
  const checkState=()=>{
    if(state==="1"){
      return <Card.Footer className="text-muted">
      {" "}
      <AddRemoveItem
        key={props._id}
        productId={props._id}
        amount={0}
        CartID={JSON.parse(localStorage.myCart)._id}
        price={props.productPrice}
        totalPrice={0}
      /><IconButton aria-label="delete" onClick={deleteMe}>
      <DeleteIcon />
    </IconButton>
    </Card.Footer>
    }else{return <Card.Footer className="text-muted">
    <AddRemoveItem 
      key={props._id}
      productId={props._id}
      amount={0}
      CartID={JSON.parse(localStorage.myCart)._id}
      price={props.productPrice}
      totalPrice={0}
    /><IconButton disabled aria-label="delete" onClick={deleteMe}>
    <DeleteIcon />
  </IconButton>
  </Card.Footer>}
  };
  const [categories, setCategories] = useState<categoryModel[]>(
    store.getState().categoryState.categoriesST
  );
  const [myProdAm,setMyPro] =useState(store.getState().ItemsState.ItemsST);
    store.subscribe(() => {
        setMyPro(store.getState().ItemsState.ItemsST);
        console.log("subscribe");
      });
      const totalP = ()=>{if(myProdAm.filter(item=>item.productId===props._id).length===0){
        return 0
    }else{
        return myProdAm.filter(item=>item.productId===props._id)[0].totalPrice
    } };
  const deleteMe = ()=>{
    const itemSave: ItemModel = {
        productId: props._id,
        amount: 0,
        totalPrice: 0,
        CartID: JSON.parse(localStorage.myCart)._id,
      };
    let pay = sessionStorage.getItem("toPay")||"0";
    let pay2 = +pay;
    let thisPay = +totalP();
  console.log(pay2);
  console.log(thisPay);
  store.dispatch(deleteItemsST(props._id));
      store.dispatch(addItemsST(itemSave));

    store.dispatch(deleteItemsST(props._id));
    sessionStorage.setItem("toPay",(pay2-(+thisPay)).toString())
  };
  
  return (
    <div className="OneItem">
      <Card className="text-center">
        <Card.Header className="head2">
          {
            categories.filter(
              (category) => category._id === props.productCategory
            )[0].categoryName
          }{" "}
          <br></br>
          {props.productName}{" "}
        </Card.Header>
        <div className="body" >
          {/* <Card.Title></Card.Title> */}
          <div className="image"
>
            <img
              className="image"
              src={props.productImage}
              alt="img"
              style={{ height: 30 , width:30}}
            />
          </div>
          <div className="total">{totalP()}</div>
        </div>
        {checkState()}
        {/* <Card.Footer className="text-muted">
          {" "}
          <AddRemoveItem
            key={props._id}
            productId={props._id}
            amount={0}
            CartID={JSON.parse(localStorage.myCart)._id}
            price={props.productPrice}
            totalPrice={0}
          /><IconButton aria-label="delete" onClick={deleteMe}>
          <DeleteIcon />
        </IconButton>
        </Card.Footer> */}
      </Card>
    </div>
  );
}

export default OneItem;

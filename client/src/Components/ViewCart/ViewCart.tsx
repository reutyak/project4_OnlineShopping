import "./ViewCart.css";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { store } from "../../redux/store";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useEffect, useState } from "react";
import { ItemModel } from "../../Model/itemModel";
import { productModel } from "../../Model/productModel";
import React from "react";
import AddRemoveItem from "../AddRemoveItem/AddRemoveItem";
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate } from "react-router-dom";

import { ProSidebarProvider } from "react-pro-sidebar";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Button, ButtonGroup, IconButton, Paper, TextField } from "@mui/material";
import { deleteItemsST } from "../../redux/itemsState";
import Amount from "../Amount/Amount";
import SingleCard from "../SingleCard/SingleCard";
import OneItem from "../OneItem/OneItem";
import ForPayment from "../ForPayment/ForPayment";

function ViewCart(): JSX.Element {
  const navigate = useNavigate();
  const state = sessionStorage.getItem("state");
  const [list, setList] = useState<ItemModel[]>();
  const [products, setProducts] = React.useState<productModel[]>(
    store.getState().productState.productsST
  );
  function renderRow(props: ListChildComponentProps, item1: ItemModel) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={`Total Price: ${item1.totalPrice}`} />
        </ListItemButton>
      </ListItem>
    );
  }
  const checkState1 = ()=>{
    if(state==="1"){return <Button onClick={checkout}><>Checkout</></Button> }else {return <Button onClick={checkout1}><>Back to continue shopping</></Button>}
  };
  useEffect(() => {
    const myList = store.getState().ItemsState.ItemsST;
    setList(myList);
  }, []);

  store.subscribe(() => {
    setList(store.getState().ItemsState.ItemsST);
    console.log("subscribe");
  });

  const checkout=async ()=>{
    sessionStorage.setItem("state", "0");
    await navigate("/payment");
  };

  const checkout1=async ()=>{
    sessionStorage.setItem("state", "1");
    await navigate("/user");
  };

  return (
    <div className="ViewCart">
      <Paper style={{ maxHeight: "auto",  width:"auto" }}>
        <ProSidebarProvider>
          <Sidebar>
            <div className="title">your products:</div>
            <Menu className="ViewCart1">
              {list?.map((item) => {
                const myPro = products.filter((pro)=>pro._id===item.productId)[0]
                return <MenuItem className="item"><OneItem _id={myPro._id} productName={myPro.productName} productCategory={myPro.productCategory} productPrice={myPro.productPrice} productImage={myPro.productImage}/></MenuItem>;
              })}
            </Menu>
          </Sidebar>
        </ProSidebarProvider>
        <div className="pay"><ForPayment/></div>{checkState1()}
      </Paper>
    </div>
  );
}

export default ViewCart;

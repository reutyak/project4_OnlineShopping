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
import Header from "../Header/Header";
import { Box, Grid, Paper, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function FirstPage(): JSX.Element {
    const[products, setProducts]=useState<productModel[]>(store.getState().productState.productsST)
const [categories, setCategories]= useState<categoryModel[]>(store.getState().categoryState.categoriesST);

useEffect(() => {
  // sessionStorage.setItem("myToken", "");
  // sessionStorage.setItem("email", "");
  // sessionStorage.setItem("role", "");
  sessionStorage.setItem("userName","guest")


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
        <header><Header /></header>
        <main>        
          <Box className="Box" sx={{ flexGrow: 1 }}>

          <Grid className="Grid" container spacing={3}>

  <Grid className="Grid" xs>
    <Login />
  </Grid>
  <Grid className="Grid" xs>
    <Advertisement />
  </Grid >
  <Grid className="Grid" xs>
  <Information />
  </Grid>
</Grid></Box></main>
        {/* <main><div className="Login"><Login /></div>
        <div className="Advert"><Advertisement /></div>
        <div className="Information"><Information /></div> */}
        {/* </main> */}
        </div>
    );
}

export default FirstPage;

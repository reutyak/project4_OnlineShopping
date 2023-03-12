import AdminMenu from "../AdminMenu/AdminMenu";
import Header from "../Header/Header";
import ProductList from "../ProductList/ProductList";
import "./Admin.css";
import { useEffect, useState } from "react";
import { productModel } from "../../Model/productModel";
import { store } from "../../redux/store";
import productServices from "../../services/productServices"
import { categoryModel } from "../../Model/categoryModel";
import categoryServices from "../../services/categoryServices"
import { Tab } from "@mui/material";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ViewCart from "../ViewCart/ViewCart"
import ForPayment from "../ForPayment/ForPayment";
import SearchResult from "../SearchResult/SearchResult";
import { deleteSearchST } from "../../redux/searchState";
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
function Admin(): JSX.Element {
    const[products, setProducts]=useState<productModel[]>(store.getState().productState.productsST)
const [categories, setCategories]= useState<categoryModel[]>(store.getState().categoryState.categoriesST);
const theme = useTheme();
const [value, setValue] = useState(0);
const [num, setNum] = useState(0);
const [searchS, setSearchS] = useState(store.getState().SearchState.SearchST);
store.subscribe(() => {
  setSearchS(store.getState().SearchState.SearchST);
});
const view1 = (category:categoryModel)=>{
if(store.getState().SearchState.SearchST){
return <SearchResult/>
}else{
  console.log(searchS)
  return <>
  <ProductList _id={category._id} categoryName={category.categoryName}/>
  </>
}};
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    store.dispatch(deleteSearchST());
    sessionStorage.setItem("search","");
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

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
        <div className="Admin">
            <header><Header /></header>
			<AdminMenu/>
            <body>
            <Box sx={{ width: '160%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example">
            {categories.map((category)=>{return <Tab label={category.categoryName} {...a11yProps(num)} />;setNum(num+1)})}
        </Tabs>
      </Box>
      {categories.map((category)=><TabPanel value={value} index={categories.map(function(o) { return o._id; }).indexOf(category._id)}>
        {/* <ProductList _id={category._id} categoryName={category.categoryName}/> */}
        {view1(category)}
      </TabPanel>)}
    </Box>  </body>      </div>
    );
}

export default Admin;

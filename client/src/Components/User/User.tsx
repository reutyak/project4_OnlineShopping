import { useEffect, useState } from "react";
import "./User.css";
import { productModel } from "../../Model/productModel";
import { store } from "../../redux/store";
import productServices from "../../services/productServices"
import { categoryModel } from "../../Model/categoryModel";
import categoryServices from "../../services/categoryServices"
import Header from "../Header/Header";
import { Tab } from "@mui/material";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
function User(): JSX.Element {
const[products, setProducts]=useState<productModel[]>(store.getState().productState.productsST)
const [categories, setCategories]= useState<categoryModel[]>(store.getState().categoryState.categoriesST);
const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        <div className="User">
          <header><Header/></header>
          <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      {/* </SwipeableViews> */}
    </Box>

			
        </div>
    );
}

export default User;

import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import "./Information.css";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PeopleIcon from '@mui/icons-material/People';
function Information(): JSX.Element {
    const[numProd,setNumProd]=useState(store.getState().productState.productsST.length);
    const[numOrd,setNumOrd]=useState(store.getState().UserState.usersST.length);


    return (
        <div className="Information">
            
          <div className="inf"><ProductionQuantityLimitsIcon className="icon" color="primary"/><br></br>{localStorage.getItem("numProducts")} available products</div>
            <div className="inf"><PeopleIcon className="icon" color="primary"/><br></br>{localStorage.getItem("numUsers")} of orders</div>
			{/* <div className="inf">Notification:notification you have open cart from 23/2/23 your last purchase was on 1/2/22 </div> */}

          
			
        </div>
    );
}

export default Information;

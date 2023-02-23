import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import "./Information.css";

function Information(): JSX.Element {
    const[numProd,setNumProd]=useState(store.getState().productState.productsST.length);
    const[numOrd,setNumOrd]=useState(store.getState().UserState.usersST.length);


    return (
        <div className="Information">
			<div>{store.getState().productState.productsST.length} available products in our store</div>
            <div>{store.getState().UserState.usersST.length} of orders in our store</div>
			<div>Notification:notification you have open cart from 23/2/23 your last purchase was on 1/2/22 </div>

        </div>
    );
}

export default Information;

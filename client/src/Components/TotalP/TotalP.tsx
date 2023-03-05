import { useState } from "react";
import "./TotalP.css";
import { store } from "../../redux/store";
import { productModel } from "../../Model/productModel";

function TotalP(props:productModel): JSX.Element {
    const [myProdAm,setMyPro] =useState(store.getState().ItemsState.ItemsST);
    store.subscribe(() => {
        setMyPro(store.getState().ItemsState.ItemsST);
        console.log("subscribe");
      });
      const totalP = ()=>{if(myProdAm.filter(item=>item.productId===props._id).length===0){
        return 0
    }else{
        return myProdAm.filter(item=>item.productId===props._id)[0].totalPrice+(" $")
    } };
    return (
        <div className="TotalP">
			{totalP()}
        </div>
    );
}

export default TotalP;

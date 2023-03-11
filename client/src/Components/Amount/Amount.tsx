import { useState } from "react";
import { ItemModel } from "../../Model/itemModel";
import "./Amount.css";
import { store } from "../../redux/store";

function Amount(props:ItemModel): JSX.Element {
    const [myProdAm,setMyPro] =useState(store.getState().ItemsState.ItemsST);
    store.subscribe(() => {
        setMyPro(store.getState().ItemsState.ItemsST);
      });
    
    console.log(myProdAm);
    const count = ()=>{if(myProdAm.filter(item=>item.productId===props.productId).filter(item=>item.CartID===item.CartID).length===0){
        return 0
    }else{
        return myProdAm.filter(item=>item.productId===props.productId).filter(item=>item.CartID===item.CartID)[0].amount
    } };

    return (
        <div className="Amount">
			{count()}
        </div>
    );
}

export default Amount;

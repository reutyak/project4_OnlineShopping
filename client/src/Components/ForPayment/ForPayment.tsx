import { useState } from "react";
import "./ForPayment.css";
import { store } from "../../redux/store";

function ForPayment(): JSX.Element {
    
    return (
        <div className="ForPayment">
			for payment: {sessionStorage.getItem("toPay")}
        </div>
    );
}

export default ForPayment;

import { useForm } from "react-hook-form";
import Header from "../Header/Header";
import ViewCart from "../ViewCart/ViewCart";
import "./Payment.css";
import orderModel from "../../Model/orderModel";
import orderServices from "../../services/orderServices"
import { ItemsState } from "../../redux/itemsState";
import { store } from "../../redux/store";
import OK from "../OK/OK";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import itemsServices from "../../services/itemsServices";
function Payment(): JSX.Element {
    const { register, handleSubmit } = useForm<orderModel>();
    const [modalShowOK, setModal] = useState(false);
    const navigate = useNavigate();

    const modalUpOK=()=>{
        if (modalShowOK === true) {
            return (
              <OK
                show={modalShowOK}
                onHide={() => {
                  setModal(false);
                  navigate("/");
                }}
              />
            );
          }
    };
    const send = async (order: orderModel) => {
        console.log(order);
        orderServices.addOrder(order);
        itemsServices.addItems(store.getState().ItemsState.ItemsST);
        
      setModal(true);
    };
    const toPay=()=>{
         let pay = sessionStorage.getItem("toPay");
         if(pay){
            return +pay
         }else{
            return 0
         }
    };

    return (
        <div className="Payment">
			<header><Header/></header>
          <body>
          <aside className="cart"><ViewCart/></aside>	
          <form className="login" onSubmit={handleSubmit(send)}>
        <div className="form container">
          <h4 className="head">Order</h4>
          <h3 className="head2">Shipping Detail</h3>
          {/* <div className="Alert">{alertOn()}</div> */}
          {/* <label htmlFor="sel">
            Enter your Email - it's will be your user name:
          </label> */}
          <input
            className="form-control"
            id="sel"
            type="text"
            placeholder="City"
            required
            {...register("DeliveryCity")}
          ></input>
          {/* <label>Enter Password:</label> */}
          <input
            className="form-control"
            type="text"
            placeholder="street"
            required
            {...register("DeliveryStreet")}
          ></input>
          <input
            className="form-control"
            required
            placeholder="Shipping date"
            type="date"
            {...register("DeliveryDate")}
          ></input>
        <h3 className="head2">Payments</h3>
        <input
            className="form-control"
            type="number"
            placeholder="last 4 digits of credit card"
            required
            {...register("Last4Digits")}
          ></input>
          <input hidden
            className="form-control"
            type="text"
            value ={JSON.parse(localStorage.myCart)._id}
            {...register("cartID")}
          ></input>
          <input hidden
            className="form-control"
            type="string"
            value ={JSON.parse(localStorage.myCart).date}
            {...register("OrderDate")}
          ></input>
          <input hidden
            className="form-control"
            type="text"
            value ={JSON.parse(localStorage.myCart).userName}
            {...register("userEmail")}
          ></input>
          <input 
            className="form-control"
            type="number"
            value ={toPay()}
            {...register("totalPriceToPay")}
          ></input>
          <input
            className="btn btn-primary"
            required
            type="submit"
            value="Order"
          />
          {/* <br /> */}
          {/* <p> */}
            {/* Don't have an account yet?&nbsp;&nbsp; */}
            {/* <Button variant="outlined" color="primary"><NavLink  className="nav-link" to="/register">Sign up</NavLink></Button> */}

            {/* <NavLink to="/register">
              <span> Sign up&nbsp;</span>
            </NavLink> */}
          {/* </p> */}
        </div>
      </form>
      <div>{modalUpOK()}</div>
    </body>	
        </div>
    );
}

export default Payment;

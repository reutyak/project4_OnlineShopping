import { Button } from "@mui/material";
import "./AddRemoveItem.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalAddRemove from "../ModalRemove/ModalRemove";
import ModalAdd from "../ModalAdd/ModalAdd";
import ModalRemove from "../ModalRemove/ModalRemove";
import { useEffect, useState } from "react";
import { ItemModel } from "../../Model/itemModel";
import { store } from "../../redux/store";
import { ItemModel1 } from "../../Model/itemModel1";
import {
  addItemsST,
  deleteItemsST,
  updateItemsST,
} from "../../redux/itemsState";
import { productModel } from "../../Model/productModel";
import Amount from "../Amount/Amount";

function AddRemoveItem(props: ItemModel1): JSX.Element {
  const myItem = { ...props };
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    if (store.getState().ItemsState.ItemsST.some(pro=>pro.productId===props.productId)) {
      setAmount(store.getState().ItemsState.ItemsST.filter(pro=>pro.productId===props.productId)[0].amount)
    }
  }, []);

  // store.subscribe(() => {
  //   setAmount(store.getState().ItemsState.ItemsST.filter(pro=>pro.productId===props.productId)[0].amount);
  //   console.log("subscribe");
  // });

  
  myItem.totalPrice = amount * myItem.price;
  const modalUp2 = () => {
    if (modalShow2 === true) {
      return (
        <ModalRemove
          show={modalShow2}
          onHide={() => {
            setModalShow2(false);
          }}
        />
      );
    }
  };
  const modalUp3 = () => {
    if (modalShow3 === true) {
      return (
        <ModalAdd
          show={modalShow3}
          onHide={() => {
            setModalShow3(false);
          }}
        />
      );
    }
  };

  const organizationData = async (amo:number) => {
    myItem.amount = amount;
    const itemSave: ItemModel = {
      productId: myItem.productId,
      amount: amo,
      totalPrice: amo*myItem.price,
      CartID: JSON.parse(localStorage.myCart)._id,
    };
    if (
      store
        .getState()
        .ItemsState.ItemsST.filter(
          (pro) => pro.productId === itemSave.productId
        ).length === 0
    ) {
      await store.dispatch(addItemsST(itemSave));
      console.log(await store.getState().ItemsState.ItemsST);
    } else {
      store.dispatch(deleteItemsST(itemSave.productId));
      store.dispatch(addItemsST(itemSave));
    }
  };

  return (
    <div className="AddRemoveItem">
      <Button
        onClick={async () => {
          if (amount > 0) {
            setAmount(amount - 1);
            let pay = sessionStorage.getItem("toPay")||"0";
          var pay2 = +pay;
            // myItem.amount = amount;
            setModalShow2(true);
            sessionStorage.setItem("toPay", (pay2-(props.price)).toString());

            organizationData(amount - 1);
            // myProd.amount=amount - 1;
            // setProd(store.getState().ItemsState.ItemsST.filter(item=>props.productId===item.productId)[0]);

          } else {
            console.log();
          }
          console.log(myItem);
        }}
        size="small"
        color="secondary"
      >
        <RemoveCircleIcon />
      </Button>
      <Amount key={props.productId} productId={props.productId} amount={amount} totalPrice={props.totalPrice} CartID={props.CartID}/>
      {/* {amount} */}
      <Button
        onClick={async () => {
          setAmount(amount + 1);
          // myItem.amount = amount;
          let pay = sessionStorage.getItem("toPay")||"0";
          var pay1 = +pay;
          setModalShow3(true);
          sessionStorage.setItem("toPay", (pay1+(props.price)).toString());
          // sessionStorage.setItem("toPay", pay-props.price)
          console.log(myItem);
          organizationData(amount + 1);
          // setProd(store.getState().ItemsState.ItemsST.filter(item=>props.productId===item.productId)[0]);
          // myProd.amount=amount + 1;
        }}
        size="small"
      >
        <AddCircleIcon />
      </Button>
      <div>{modalUp2()}</div>
      <div>{modalUp3()}</div>
    </div>
  );
}

export default AddRemoveItem;

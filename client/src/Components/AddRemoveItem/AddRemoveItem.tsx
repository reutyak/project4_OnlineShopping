import { Button } from "@mui/material";
import "./AddRemoveItem.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalAddRemove from "../ModalRemove/ModalRemove";
import ModalAdd from "../ModalAdd/ModalAdd";
import ModalRemove from "../ModalRemove/ModalRemove";
import { useState } from "react";
import { ItemModel } from "../../Model/itemModel";
import { store } from "../../redux/store";
import { ItemModel1 } from "../../Model/itemModel1";
import {
  addItemsST,
  deleteItemsST,
  updateItemsST,
} from "../../redux/itemsState";

function AddRemoveItem(props: ItemModel1): JSX.Element {
  const myItem = { ...props };
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [amount, setAmount] = useState(0);
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
    console.log(store.getState().ItemsState.ItemsST);
    console.log(myItem);
    myItem.amount = amount;
    console.log(myItem);
    const itemSave: ItemModel = {
      productId: myItem.productId,
      amount: amo,
      totalPrice: myItem.totalPrice,
      CartID: JSON.parse(localStorage.myCart)._id,
    };
    console.log(itemSave);

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
            // myItem.amount = amount;
            setModalShow2(true);
            organizationData(amount - 1);
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
      {amount}
      <Button
        onClick={async () => {
          setAmount(amount + 1);
          // myItem.amount = amount;
          setModalShow3(true);
          console.log(myItem);
          organizationData(amount + 1);
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

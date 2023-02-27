import { Button } from "@mui/material";
import "./AddRemoveItem.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalAddRemove from "../ModalRemove/ModalRemove";
import ModalAdd from "../ModalAdd/ModalAdd";
import ModalRemove from "../ModalRemove/ModalRemove";
import { useState } from "react";
import { ItemModel } from "../../Model/itemModel";
function AddRemoveItem(props:ItemModel): JSX.Element {
    const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [amount, setAmount] = useState(0);

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
  
  return (
        <div className="AddRemoveItem">
			<Button onClick={()=>{if(amount>0){setAmount(amount-1); setModalShow2(true)}else{console.log()} }} size="small" color="secondary">
                    <RemoveCircleIcon />
                  </Button>
                  {amount}
                  <Button onClick={()=>{setAmount(amount+1);setModalShow3(true)}} size="small">
                    <AddCircleIcon />
                  </Button>
                  <div>{modalUp2()}</div>
      <div>{modalUp3()}</div>
        </div>
    );
}

export default AddRemoveItem;

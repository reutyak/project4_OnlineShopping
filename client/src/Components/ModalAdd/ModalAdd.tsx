import { Modal } from "react-bootstrap";
import "./ModalAdd.css";
import Button from "react-bootstrap/esm/Button";

function ModalAdd(props: any): JSX.Element {
  return (
    <Modal
      {...props}
      size="lg"
      color = "secondary"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>Add Product</h4>
        <p>one product added</p>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>

        {/* <Button 
 onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAdd;

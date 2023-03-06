import "./OK.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
function OK(props: any): JSX.Element {
    return (
        <div className="OK">
    <Modal
      {...props}
      size="lg"
      color = "secondary"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p>Your purchase has been made successfully</p>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={props.onHide}>OK</Button>

        {/* <Button 
 onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  
        </div>
    );
}

export default OK;

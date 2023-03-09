import "./OK.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { store } from "../../redux/store";
function OK(props: any): JSX.Element {
    const myItems = store.getState().ItemsState.ItemsST;
    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(myItems)],    
                    {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
      }
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
        <Button onClick={downloadTxtFile}>Download purchase invoice</Button>
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

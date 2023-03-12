import "./OK.css";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { store } from "../../redux/store";
function OK(props: any): JSX.Element {
    // const myItems = store.getState().ItemsState.ItemsST;
    const toPay = sessionStorage.getItem("toPay")||"";
        const myItems = store.getState().ItemsState.ItemsST;
const myText = myItems.map(item=>(store.getState().productState.productsST.filter(product=>product._id===item.productId)[0]).productName+" "+item.amount+" "+item.totalPrice);
const downloadTxtFile = () => {
        const element = document.createElement("a");
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(myText.join('\n'))+'\ntotalPrice: '+toPay);

        element.style.display = 'none';
        document.body.appendChild(element);
        // const file = new Blob([JSON.stringify(myText)],    
        //             {type: 'text/html;charset=utf-8'});
        // element.href = URL.createObjectURL(file);
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

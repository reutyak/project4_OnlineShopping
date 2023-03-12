import { Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import AddRemoveItem from "../AddRemoveItem/AddRemoveItem";
import "./SingleCard.css";
import { store } from "../../redux/store";
import { useState } from "react";
import { categoryModel } from "../../Model/categoryModel";
import { productModel } from "../../Model/productModel";
import productServices from "../../services/productServices";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";

function SingleCard(props:productModel): JSX.Element {
  const myCurrentToken = localStorage.getItem("myToken");
    const navigate= useNavigate();
    const [categories, setCategories] = useState<categoryModel[]>(
        store.getState().categoryState.categoriesST
      );
      const myPro = store.getState().ItemsState.ItemsST.filter(item=>item.productId===props._id)[0];
      const myState = localStorage.getItem("role");
      const operation = ()=>{
        if(myState == "0"){
          return       <AddRemoveItem key = {props._id} productId={props._id} amount={0}  CartID={JSON.parse(localStorage.myCart)._id} price={props.productPrice} totalPrice={0} />

        }else {return <><IconButton className="btn" aria-label="delete" color="error" size="large" onClick={async () => {
            try {
              productServices.deleteProduct(props._id);
            } catch (err: any) {
              if (err.message == "Request failed with status code 401") {
                console.log(err.message);
              }
              // {setModalShow(true)}
            }
          } }><DeleteIcon />
          </IconButton><IconButton className="btn" aria-label="edit" color="success" onClick={() => {
            navigate(`/admin`);
          } }>
              <EditIcon />
            </IconButton></>}};
      return (
        <div className="SingleCard">
			<Card variant="outlined" sx={{ width: "100%" }}>
                {/* <React.Fragment > */}
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {
                      categories.filter(
                        (category) => category._id === props.productCategory
                      )[0].categoryName
                    }{" "}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {props.productName}{" "}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    {props.productPrice}&#36;{" "}
                  </Typography>
                  <Typography variant="body2">
                    <img
                      className="image"
                      src={props.productImage}
                      alt="img"
                      style={{ height: 50 , width:50}}
                      />
                  </Typography>
                </CardContent>

                <CardActions>
                {operation()}
                </CardActions>
                {/* </React.Fragment> */}
              </Card>
        </div>
    );
}

export default SingleCard;

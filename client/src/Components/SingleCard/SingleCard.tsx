import { Card, CardActions, CardContent, Typography } from "@mui/material";
import AddRemoveItem from "../AddRemoveItem/AddRemoveItem";
import "./SingleCard.css";
import { store } from "../../redux/store";
import { useState } from "react";
import { categoryModel } from "../../Model/categoryModel";
import { productModel } from "../../Model/productModel";

function SingleCard(props:productModel): JSX.Element {
    const [categories, setCategories] = useState<categoryModel[]>(
        store.getState().categoryState.categoriesST
      );
      const myPro = store.getState().ItemsState.ItemsST.filter(item=>item.productId===props._id)[0];
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
                  <Typography variant="h5" component="div">
                    {props.productName}{" "}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.productPrice}&#36;{" "}
                  </Typography>
                  <Typography variant="body2">
                    <img
                      className="image"
                      src={props.productImage}
                      alt="img"
                      style={{ height: 150 }}
                    />
                  </Typography>
                </CardContent>

                <CardActions>
                  <AddRemoveItem key = {props._id} productId={props._id} amount={0}  CartID={JSON.parse(localStorage.myCart)._id} price={props.productPrice} totalPrice={0} />
                  
                </CardActions>
                {/* </React.Fragment> */}
              </Card>
        </div>
    );
}

export default SingleCard;

import "./AddProduct.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import { productModel } from "../../Model/productModel";
import { store } from "../../redux/store";
import ModalAuth from "../ModalAuth/ModalAuth";
import productServices from "../../services/productServices";
import AdminMenu from "../AdminMenu/AdminMenu";
import { categoryModel } from "../../Model/categoryModel";

function AddProduct(): JSX.Element {
  const [modalShow, setModalShow] = useState(false);
  const { register, handleSubmit } = useForm<productModel>();
  const [alert, setAlert] = useState<Boolean>(false);
  const [pic, setPic] = useState<Boolean>(false);
  const [product, setProduct] = useState<productModel>();
  const [categories, setCategories]= useState<categoryModel[]>(store.getState().categoryState.categoriesST);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id || 0;
  const myCurrentToken = localStorage.getItem("myToken");
  axios.defaults.headers.common = { Authorization: myCurrentToken };
  const [products, setProducts] = useState<productModel[]>(
    store.getState().productState.productsST
  );

  useEffect(() => {
    if (id != 0) {
      const myProduct = products.filter((product) => product._id === id);
      setProduct(myProduct[0]);
    }
  }, []);

  const alertOn = () => {
    if (alert === true) {
      return (
        <Alert variant="outlined" severity="error">
          Image size must be smaller than 530KB{" "}
        </Alert>
      );
    }
  };

  const setPicFunc = () => {
    setPic(true);
  };

  const updatePic = () => {
    if (pic === true) {
      return (
        <input
          className="form-control"
          type="text"
          {...register("productImage")}
        />
      );
    }
  };

  const modalUp = () => {
    if (modalShow === true) {
      return (
        <ModalAuth
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            navigate("/");
          }}
        />
      );
    }
  };

  const send = async (newProduct: productModel) => {
    // if (newVacation.vacation_img[0]?.size > 57000) {
    //   setAlert(true);
    // } else {
    //   try {
    //     console.log(newVacation.vacation_img[0]);
    //     console.log(await getBase64(newVacation.vacation_img[0]));
    //     setFile(await getBase64(newVacation.vacation_img[0]));
    //     newVacation.vacation_img = await getBase64(newVacation.vacation_img[0]);
    //   } catch (err: any) {
    //     console.log(err.message);
    //   }
    try {
      if (id === 0) {
        productServices.addProduct(newProduct);
        setProducts(store.getState().productState.productsST);
        navigate("/admin");
      }
      if (id != 0) {
        newProduct._id = id;
        newProduct.productCategory =
          product?.productCategory || newProduct.productCategory;
        newProduct.productName = product?.productName || newProduct.productName;
        newProduct.productPrice =
          product?.productPrice || newProduct.productPrice;
        //   if (pic === false) {
        //     newVacation.vacation_img = vacation?.vacation_img;
        //   } else {
        //     newVacation.vacation_img = newVacation.vacation_img;
        //   }
        newProduct.productImage =
          product?.productImage || newProduct.productImage;
        productServices.updateProduct(id, newProduct);
        setProducts(store.getState().productState.productsST);
        navigate("/admin");
        //   await axios
        //     .put("http://localhost:3004/admin/vacation/update", newVacation)
        //     .then(async (res) => {
        //       const addProduct = res.data;
        //       const currentToken = res.headers["authorization"];
        //       localStorage.setItem("myToken", currentToken || "");
        //       await store.dispatch(deleteVacationSt(id));
        //       console.log(store.getState().vacationState.vacationsSt);
        //       store.dispatch(addVacationSt(addProduct));
        //       console.log(store.getState().vacationState.vacationsSt);
        //       navigate("/admin");
        //     });
      }
    } catch (err: any) {
      if (err.message == "Request failed with status code 401") {
        setModalShow(true);
      }
      console.log(err.message);
    }
    // }
  };

  return (
    <div className="AddProduct">
      <div>{modalUp()}</div>
      <header>
        <AdminMenu />
      </header>
      <div>
        <form className="add" onSubmit={handleSubmit(send)}>
          <h4 className="head">
            {id === 0 ? "Add Product:" : "Update Product:"}
          </h4>
          <div className="Alert">{alertOn()}</div>
          <label>Product Category:</label>
          <div><select required style={{ height: 30 }} {...register("productCategory")}>
                        <option disabled>select option</option>
                        {categories.map(item => <option key={item._id} value={item._id}>{item.categoryName}</option>)}
                    </select></div>

          <label>Product Name:</label>
          <input
            className="form-control"
            type="text"
            defaultValue={product?.productName}
            required
            {...register("productName")}
          />

          <label>Product Price:</label>
          <input
            className="form-control"
            type="number"
            defaultValue={
                product?.productPrice
            }
            required
            {...register("productPrice")}
          />

          {/* <label>Product image:</label>
          <input
            className="form-control"
            type="text"
            defaultValue={
              product?.productImage
            }
            required
            {...register("productImage")}
          /> */}

          <label>Product image:</label>
          {product ? (
            <>
              <p hidden>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={product?.productImage}
                  {...register("productImage")}
                />
              </p>
              <button
                className="btn btn-xs btn-link"
                type="button"
                onClick={setPicFunc}
              >
                Update Picture
              </button>
            </>
          ) : (
            <input
              className="form-control"
              type="text"
              {...register("productImage")}
            />
          )}
          <p>{updatePic()}</p>
          <input
            className="btn btn-primary"
            type="submit"
            value="save product"
          />
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

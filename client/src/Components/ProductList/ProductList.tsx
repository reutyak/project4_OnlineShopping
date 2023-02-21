import { useNavigate } from "react-router-dom";
import ModalAuth from "../ModalAuth/ModalAuth";
import "./ProductList.css";
import { useEffect, useState } from "react";
import { store } from "../../redux/store";
import { productModel } from "../../Model/productModel";
import productServices from "../../services/productServices";
import { getAllProductsST } from "../../redux/productState";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Pagination } from "@mui/material";
import { categoryModel } from "../../Model/categoryModel";

function ProductList(): JSX.Element {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [products, setProducts] = useState<productModel[]>(
    store.getState().productState.productsST
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [categories, setCategories]= useState<categoryModel[]>(store.getState().categoryState.categoriesST);

  const pageCount = Math.ceil(products.length / 10);

  useEffect(() => {
      const myProducts = productServices.getAllProducts();
      store.dispatch(getAllProductsST(myProducts));
  }, [currentPage]);

//   const sortedProducts = products.sort(
//     (objA, objB) =>
//       new Date(objB.start_date).getTime() - new Date(objA.start_date).getTime()
//   );
  // Get currCards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const handleChange = (event: any, value: any) => {
    setCurrentPage(value);
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

  return <div className="ProductList"><div>{modalUp()}</div>
  <div className="displayCard">
      <div className="card">
      {currentCards.map((item)=>
          <div className="card-container" key={item._id} style={{ height: 360, width:250 }}>
              <p className="dest">{categories.filter(category=> category._id ===item.productCategory)[0].categoryName}</p>
              <p>{item.productName}</p>
              <img className="image" src={item.productImage} alt = "img" style={{height:150}}/>
              <p>{item.productPrice}&#36;</p>
              <div className="Buttons">
              <IconButton className="btn" aria-label="delete"  color="error" size="large" onClick={async ()=>{
                      try{
                        productServices.deleteProduct(item._id);
                        //   await axios.delete(`http://localhost:3004/admin/vacation/${item.id}`).then(
                        //       res=>{
                        //           console.log(res.headers["authorization"]);
                        //           const currentToken = res.headers["authorization"];
                        //           localStorage.setItem("myToken", currentToken||"");
                        //       }
                        //   )
                        //   .then(res=>{store.dispatch(deleteVacationSt(item.id))})
                  } catch (err: any) {
                      if(err.message=="Request failed with status code 401"){setModalShow(true)}
                      console.log(err.message);
                  }
                  }}><DeleteIcon/>
                  </IconButton>
                  <IconButton className="btn" aria-label="edit" color="success" onClick={() => {
                          navigate(`/admin/addVacation/${item._id}`);
                      }}>
                      <EditIcon/>
                  </IconButton>
              </div>
          </div>
          )}
      </div>
  </div>
  <Pagination count={pageCount} page={currentPage} onChange={handleChange} />


</div>

}

export default ProductList;

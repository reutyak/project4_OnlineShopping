import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import Login from "../Login/Login";
import User from "../User/User";
import Admin from "../Admin/Admin";
import Register from "../Register/Register";
import AddProduct from "../AddProduct/AddProduct";
import FirstPage from "../FirstPage/FirstPage";
import Payment from "../Payment/Payment";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path = "/" element={<FirstPage/>}/>
                <Route path = "/admin" element={<Admin/>}/>
                <Route path = "/admin/addProduct" element={<AddProduct/>}/>
                <Route path = "/register" element= {<Register/>}/>
                <Route path = "/payment" element= {<Payment/>}/>

                {/* <Route path = "/login" element= {<Login/>}/> */}
                {/*<Route path = "/modal" element= {<Modal/>}/>
                <Route path = "/admin/all" element={<VacationList/>}/>
                <Route path = "/admin/addVacation" element={<AddVacation/>}/>
                <Route path = "/admin/addVacation/:id" element={<AddVacation/>}/>
                <Route path = "/admin/report" element={<Report/>}/> */}
                <Route path = "/user" element={<User/>}/>
                <Route path = "*" element={<User/>}/>
            </Routes>
        </div>
    );
}

export default Routing;

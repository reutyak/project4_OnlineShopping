import { NavLink } from "react-router-dom";
import "./Header.css";
import Button from "@mui/material/Button";
import logo from "../../assets/Logo2.png";
function Header(): JSX.Element {
    const user=()=>{
        let localName = localStorage.getItem("userName")
        return localName
    }
    return (
        <div className="Header">
			{/* <nav className=" MenuAdmin navbar navbar-expand-lg navbar-light bg-light"> */}
                <img className="img" src={logo} alt="Logo"/>
                {/* <Button variant="contained" color="success">Search</Button>

            <input
              className="form-control"
              type="text"
            /> */}
            <div> | online shopping 077-7777777 |</div>
            <div>Hello {user()}</div>
			{/* <Button variant="outlined" color="success"><NavLink  className="nav-link" to="/login">login</NavLink></Button> */}
            {/* <div><NavLink className="nav-link" to="/admin/addVacation"><h6>Add Vacation</h6></NavLink></div> 
            <div><NavLink className="nav-link" to="/admin/report"><h6>Reports</h6></NavLink></div> 
            <div><NavLink className="nav-link" to="/"><h6>Exit</h6></NavLink></div>  */}
        {/* </nav> */}
        </div>
    );
}

export default Header;

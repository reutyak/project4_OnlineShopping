import { NavLink } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu(): JSX.Element {
    return (
        <div className="AdminMenu">
			<nav className=" MenuAdmin navbar navbar-expand-lg navbar-light bg-light">
			<div><NavLink  className="nav-link1" to="/admin/addProduct"><h6>Add Product</h6></NavLink></div>
            <div><NavLink className="nav-link1" to="/"><h6>Exit</h6></NavLink></div> 
        </nav>
        </div>
    );
}

export default AdminMenu;

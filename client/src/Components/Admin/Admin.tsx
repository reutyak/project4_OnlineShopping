import AdminMenu from "../AdminMenu/AdminMenu";
import Header from "../Header/Header";
import ProductList from "../ProductList/ProductList";
import "./Admin.css";

function Admin(): JSX.Element {
    return (
        <div className="Admin">
            <header><Header /></header>
			<AdminMenu/>
            <ProductList/>
        </div>
    );
}

export default Admin;

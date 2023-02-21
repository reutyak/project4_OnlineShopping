import AdminMenu from "../AdminMenu/AdminMenu";
import ProductList from "../ProductList/ProductList";
import "./Admin.css";

function Admin(): JSX.Element {
    return (
        <div className="Admin">
			<AdminMenu/>
            <ProductList/>
        </div>
    );
}

export default Admin;

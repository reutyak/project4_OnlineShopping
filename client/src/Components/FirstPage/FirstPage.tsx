import Advertisement from "../Advertisement/Advertisement";
import Information from "../Information/Information";
import Login from "../Login/Login";
import "./FirstPage.css";

function FirstPage(): JSX.Element {
    return (
        <div className="FirstPage">
			<div className="Login"><Login/></div>
            <div className="Advert"><Advertisement/></div>
            <div className="Information"><Information/></div>
        </div>
    );
}

export default FirstPage;

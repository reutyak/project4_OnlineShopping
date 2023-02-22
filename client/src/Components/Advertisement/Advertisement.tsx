import "./Advertisement.css";
import logo from "../../assets/Logo2.png";

function Advertisement(): JSX.Element {
  return (
    <div className="Advertisement">
      <img className="img" src={logo} alt="Logo" />
      <div className="sisma">
        Because of the quality,
         because of the service,
          because of the price
      </div>
    </div>
  );
}

export default Advertisement;

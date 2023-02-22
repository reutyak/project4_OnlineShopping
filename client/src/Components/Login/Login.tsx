import react from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { useEffect } from "react";
import { store } from "../../redux/store";
import { LoginModel } from "../../Model/loginModel";
import { UserModel } from "../../Model/userModel";
import * as dotenv from "dotenv";
import userServices from "../../services/userServices";
import { Alert, Button } from "@mui/material";
const port = process.env.SERVER_PORT;

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<LoginModel>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<Boolean>(false);

  const alertOn = () => {
    if (alert === true) {
      return (
        <Alert variant="outlined" severity="error">
          One of the details you entered is incorrect
        </Alert>
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("myToken", "");
    localStorage.setItem("email", "");
    localStorage.setItem("role", "");
  }, []);

  const send = async (userLogin: LoginModel) => {
    try {
      const myLogin = userServices.login(userLogin);
      let myRole = localStorage.getItem("role");
      console.log(myRole);
      if (await myLogin == "1") {
        navigate("/admin");
      }
      if (await myLogin == "0") {
        navigate("/user");
      } else {
        setAlert(true);
      }
    } catch (err: any) {
      console.log(err.message);
      setAlert(true);
    }
  };

  return (
    <div className="Login">
      <form className="login" onSubmit={handleSubmit(send)}>
        <div className="form container">
          <h4 className="head">Registered?</h4>
          <div className="Alert">{alertOn()}</div>
          {/* <label htmlFor="sel">
            Enter your Email - it's will be your user name:
          </label> */}
          <input
            className="form-control"
            id="sel"
            type="text"
            placeholder="Email"
            required
            {...register("email")}
          ></input>
          {/* <label>Enter Password:</label> */}
          <input
            className="form-control"
            type="password"
            placeholder="password"
            required
            {...register("password")}
          ></input>
          <input
            className="btn btn-primary"
            required
            type="submit"
            value="Login"
          />
          {/* <br /> */}
          {/* <p> */}
            {/* Don't have an account yet?&nbsp;&nbsp; */}
            <Button variant="outlined" color="primary"><NavLink  className="nav-link" to="/register">Sign up</NavLink></Button>

            {/* <NavLink to="/register">
              <span> Sign up&nbsp;</span>
            </NavLink> */}
          {/* </p> */}
        </div>
      </form>
    </div>
  );
}

export default Login;

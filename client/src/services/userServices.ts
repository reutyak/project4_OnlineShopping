import { LoginModel } from './../Model/loginModel';
import react from "react";
import axios from "axios";
import * as dotenv from "dotenv";
import { UserModel } from "../Model/userModel";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// dotenv.config(); 
const port = process.env.SERVER_PORT;

const getAllUsers = async () => {
    let users: UserModel[] = [];
  axios
    .get(`http://localhost:3001/user/all`)
    .then((response) => users =  response.data);
    return users
};

const login = (userLogin:LoginModel):Promise<any> => {
  return axios
    .post(`http://localhost:3001/user/login`, userLogin).then(async (response) => {
      if (response.data === false) {
        return false;
      } else {
        if (response.data.role === "0") {
          console.log(response.headers["authorization"]);
          const currentToken = response.headers["authorization"];
          localStorage.setItem("myToken", currentToken || "");
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("role", response.data.role);
          console.log(response.data);
          return "0";
        }
        if (response.data.role === "1") {
          console.log(response.headers);
          const currentToken = await response.headers["authorization"];
          localStorage.setItem("myToken", currentToken);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("role", response.data.role);
          console.log(response.data);
          return "1";
        } else {
          return false;
        }
      }
    });};

export default {
  getAllUsers,
  login,
};



import { LoginModel } from './../Model/loginModel';
import react from "react";
import axios from "axios";
import * as dotenv from "dotenv";
import { UserModel } from "../Model/userModel";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from '../redux/store';
import { addUsersST, getAllUsersST } from '../redux/userState';

// dotenv.config(); 
const port = process.env.SERVER_PORT;

const getAllUsers = async () => {
    let users: UserModel[] = [];
  axios
    .get(`http://localhost:3001/user/all`)
    .then(async (response) => {
      users =  response.data
      const currentToken = await response.headers["authorization"];
        localStorage.setItem("myToken", currentToken);
        store.dispatch(getAllUsersST(users));
    });
    return users
};

const addUser = async(user:UserModel)=>{
  axios.post(`http://localhost:3001/user/register`,user).then(async (response)=>{
    user = response.data
    const currentToken = await response.headers["authorization"];
        localStorage.setItem("myToken", currentToken);
        store.dispatch(addUsersST(user));
  })
  return user
};

const getUserByEmail = async(email:string)=>{
  let user = {};
  axios.get(`http://localhost:3001/user/byEmail/${email}`).then((response)=>user = response.data)
  return user
}

const login = (userLogin:LoginModel):Promise<any> => {
  return axios
    .post(`http://localhost:3001/user/login`, userLogin).then(async (response) => {
      if (response.data === false) {
        return false;
      } else {
        if (response.data.role === "0") {
          console.log(response.headers["authorization"]);
          const currentToken =await response.headers["authorization"];
          localStorage.setItem("myToken", currentToken || "");
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("role", response.data.role);
          // localStorage.setItem("userName", response.data.firstName);
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
  addUser,
  getUserByEmail,
  login,
};



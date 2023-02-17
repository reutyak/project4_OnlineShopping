import react from "react";
import axios from "axios";
import dotenv from "dotenv";
import { UserModel } from "../Model/userModel";
import { useState } from "react";

const getAllUsers = async () => {
    let users: UserModel[] = [];
  axios
    .get(`http://localhost:${process.env.SERVER_PORT}/user/all`)
    .then((response) => users =  response.data);
    return users
};

export default {
  getAllUsers,
};



import Tab from "@mui/material/Tab";
import "./Register.css";
import { Alert, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserModel } from "../../Model/userModel";
import { store } from "../../redux/store";
import { UserState } from "../../redux/userState";
import userServices from "../../services/userServices";
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';

function Register(): JSX.Element {
    const [value, setValue] = React.useState('1');
    const [step2, setStep2] = useState(false);
    const [users, setUsers] = useState<UserModel[]>(store.getState().UserState.usersST);
    const {register, handleSubmit} = useForm<UserModel>();
    const navigate = useNavigate();
    const [alert, setAlert] = useState<Boolean>(false);
    const [alert2, setAlert2] = useState<Boolean>(false);
    const [password,setPassword]=useState("");
    const [Email,setEmail]=useState("");

    const [conPassword,setConPassword]=useState("");
    const [ID1, setID]=useState("");
    const [disButton, setDisButton]=useState(true)
    const alertOn = ()=>{
        if (alert === true){
            return <Alert variant="outlined" severity="error">This ID already exists in the system</Alert>
        }
    };

    
    const usersMap = async () => {
        let response = false;
        console.log(users);
        console.log(ID1);
        users.map((user) => {console.log(user.ID);ID1==user.ID?response=true:console.log(false)});
        return response
    };


    const change = async ()=>{
      if(await usersMap()===false && password===conPassword){
      setStep2(true);setValue("2")}
      else{
        setAlert(true)
      }      
      console.log(password,conPassword)
    };

    const icon=()=>{
      if(password===conPassword && password!==""){
        return <><CheckBoxTwoToneIcon /><br></br>
        </>
      }else{
        return <><CancelPresentationTwoToneIcon/><br></br></>
      }
    };

    const next = ()=>{
      if (ID1!=="" && password !=="" && Email!==""){
        return <input className="btn btn-primary" type="button"
        onClick={change} value="next" />
      }else{return <input className="btn btn-primary" type="button" disabled
      onClick={change} value="next" />}
    }

    const check = ()=>{
      if(step2){
      return   (<><Tab label="step 1" value="1" disabled/><Tab label="step 2" value="2" /></>)
      }else{
        return   (<><Tab label="step 1" value="1" /><Tab label="step 2" value="2" disabled /></>)
      }
    };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const send =  async (user: UserModel) => {
    try {
        user.ID = ID1
        userServices.addUser(user).then(()=>navigate("/"));
      
    } catch (err: any) {
        console.log(err.message);
    }
}
    return (
        <div className="Register">
          <form className="register" onSubmit={handleSubmit(send)}>
			<div className="form">
      <TabContext value={value}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <TabList onChange={handleChange} aria-label="lab API tabs example">
      {check()}
    </TabList>
  </Box>
  <TabPanel value="1">
  <h4 className="head">Register</h4>
                <div className = "Alert">{alertOn()}</div>
                {/* <label>ID:</label> */}
                <input className="form-control" type="text"
                {...register("ID")}
                id="ID1"
                name="ID1"
                value={ID1}
                placeholder="ID"
                onChange={(event) => 
                  setID(event.target.value)
                }required></input>
                {/* <label>Email:</label> */}
                <input className="form-control" type="text" {...register("email")} placeholder="Email"id="ID1"
                name="Email"
                value={Email}
                onChange={(event) => 
                  setEmail(event.target.value)
                } required ></input>
                {/* <label>Password:</label> */}
                <input className="form-control" type="password" {...register("password")}
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(event) =>
                  setPassword(event.target.value)
                } required></input>
                {/* <label>Password Confirm:</label> */}
                <div><input className="form-control" type="password"
                required 
                id="password2"
                name="password2"
                value={conPassword}
                placeholder="Password Confirm"
                onChange={(event) =>
                  setConPassword(event.target.value)
                } ></input>Password Confirm:{icon()} </div>
                <div>{next()}</div>
  </TabPanel>
  <TabPanel value="2">
        <label>City:</label>
          <input
            className="form-control"
            type="text"
            required
            {...register("city")}
          />

          <label>Street:</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("street")}
                />
                <label>Name:</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("firstName")}
                />
                <label>Last Name:</label>
                <input
                  className="form-control"
                  type="text"
                  {...register("lastName")}
                />
              
          <input
            className="btn btn-primary"
            type="submit"
            value="submit"
          /></TabPanel>
  </TabContext>
            </div>
            </form>
        </div>
    );
}

export default Register;

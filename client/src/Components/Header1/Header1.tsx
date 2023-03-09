import "./Header1.css";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import logo from "../../assets/Logo2.png";
import { useState } from "react";
import { AppBar, Box, IconButton, InputBase, Link, Toolbar, Typography, alpha, styled } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router";

function Header1(): JSX.Element {
    const [name, setName]=useState("guest")
    
    return (
        <div className="Header1">
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div>Hello {name}</div>
        
        

          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >                <img className="img" src={logo} alt="Logo"/>

online shopping 077-7777777
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
			
        </div>
    );

}

export default Header1;

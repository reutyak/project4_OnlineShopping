import { NavLink } from "react-router-dom";
import "./Header.css";
import Button from "@mui/material/Button";
import logo from "../../assets/Logo2.png";
import { useState } from "react";
import { AppBar, Box, IconButton, InputBase, Link, Toolbar, Typography, alpha, styled } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router";
function Header(): JSX.Element {
    const [name, setName]=useState(sessionStorage.getItem("userName"));
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    
    const restart = ()=>{
      localStorage.setItem("myToken",  "");
      localStorage.setItem("email", "");
      localStorage.setItem("role", "0");
      sessionStorage.setItem("userName","guest");
    }
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const searchTo = ()=>{
        sessionStorage.setItem("search",search);
      }
      
    return (
        <div className="Header">
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div>Hello {name}</div>
        
        {/* <div className="Nav"><NavLink className="nav-link1" to="/"><header>Exit</header></NavLink></div>  */}

          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >                
          <Button variant="outlined" color="secondary" onClick={()=>restart()}><NavLink  className="nav-link" to="/"><>Exit</></NavLink></Button>
         </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >                <img className="img" src={logo} alt="Logo"/>

online shopping 077-7777777
          </Typography>
          {/* <Search> */}
          <input
                className="Search"
                type="text"
                id="search"
                name="search"
                value={search}
                placeholder="Search"
                onChange={(event) => setSearch(event.target.value)}
                required
              >               
              </input><Button variant="text" color="secondary" onClick={searchTo}><SearchIcon/></Button>
            {/* <StyledInputBase
                          onChange={(event) => setSearch(event.target.value)}

              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            /> */}
          {/* </Search> */}
        </Toolbar>
      </AppBar>
    </Box>
			{/* <nav className=" MenuAdmin navbar navbar-expand-lg navbar-light bg-light"> */}
                {/* <Button variant="contained" color="success">Search</Button>

            <input
              className="form-control"
              type="text"
            /> */}
			{/* <Button variant="outlined" color="success"><NavLink  className="nav-link" to="/login">login</NavLink></Button> */}
            {/* <div><NavLink className="nav-link" to="/admin/addVacation"><h6>Add Vacation</h6></NavLink></div> 
            <div><NavLink className="nav-link" to="/admin/report"><h6>Reports</h6></NavLink></div> 
            <div><NavLink className="nav-link" to="/"><h6>Exit</h6></NavLink></div>  */}
        {/* </nav> */}
        </div>
    );
}

export default Header;

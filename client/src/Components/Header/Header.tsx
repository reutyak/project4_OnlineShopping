import { NavLink } from "react-router-dom";
import "./Header.css";
import Button from "@mui/material/Button";
import logo from "../../assets/Logo2.png";
import { useState } from "react";
import { AppBar, Box, Toolbar, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router";
import { store } from "../../redux/store";
import { deleteSearchST, getSearchST } from "../../redux/searchState";
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
    
      
      
      
      const searchTo =  ()=>{
        // store.dispatch(deleteSearchST());
        store.dispatch(getSearchST(search));
        // sessionStorage.setItem("search",search);
        setSearch("");
      }
      
    return (
        <div className="Header">
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <div>Hello {name}</div>
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
          <input
                className="Search"
                type="text"
                id="search"
                name="search"
                value={search}
                placeholder="Search"
                onChange={(event) => {store.dispatch(deleteSearchST()); setSearch(event.target.value)}}
                required
              >               
              </input><Button variant="text" color="secondary" onClick={searchTo}><SearchIcon/></Button>
        </Toolbar>
      </AppBar>
    </Box>
        </div>
    );
}

export default Header;

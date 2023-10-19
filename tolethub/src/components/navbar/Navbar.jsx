import React, { createContext, useContext } from "react";
import "./navbar.scss";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const nevigation = useNavigate();
  
  const handleClick = (e) => {
    if(!currentUser){
      alert("Please login first")
    }
  }

  const handleLogoClick = () => {
    nevigation("/")
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={handleLogoClick}>TOLETHUB</span>
        <div className="navItems">
          {currentUser && <span>{currentUser.username}</span>}
          {currentUser ? (
            <button className="navButton" onClick={logout}>logout</button>
          ) : (
            <>
              <button className="navButton"><Link to='/register'>Register</Link></button>
              <button className="navButton" ><Link to='/login'>Login</Link> </button>
            </>
          )}

          <button className="navButton addBtn" onClick={handleClick}>
            <Link style={{textDecoration: 'none'}} to={ currentUser ? "/propertys/inter" : "/login"}>
              {" "}
              <AddIcon /> Add Property{" "}
            </Link>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

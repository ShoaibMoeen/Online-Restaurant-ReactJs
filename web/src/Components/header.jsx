import React, { Component } from "react";
import logo from "./logo.png";
import sc from "./sc.PNG";
import { Link } from "react-router-dom";
import LoginPage from "./loginpage";
import LogOutBtn from "./logoutbtn";

class Header extends Component {
  render() {
    return (
      <div className="MainHeader">
        <Link to="/">
          <img className="MainLogo" src={logo} />
        </Link>
        <LogOutBtn />
        <Link to="/signUp">
          <div className="loginBtn">Register</div>
        </Link>
        <Link to="/login">
          <div className="loginBtn">Login</div>
        </Link>
        <img className="scLogo" src={sc} />
      </div>
    );
  }
}

export default Header;

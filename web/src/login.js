import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/header";
import "./main.css";
import "bootstrap/dist/css/bootstrap.css";
import LoginPage from "./Components/loginpage";

ReactDOM.render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>,
  document.getElementById("login")
);

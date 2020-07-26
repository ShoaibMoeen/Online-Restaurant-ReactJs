import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/header";
import "./main.css";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./Components/homepage";

ReactDOM.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
  document.getElementById("root")
);

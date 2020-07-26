import React, { Component } from "react";
import Header from "./header";
import NavBar from "./navbar";
import BodyComponent from "./bodyComp";
import { Redirect } from "react-router-dom";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.OnCLickLogin = this.OnCLickLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    email: "",
    pass: "",
    logStatus: false,
    error: "",
  };
  handleChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }
  render() {
    if (this.state.logStatus) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="LoginComp MakeBorder">
          <h2>User Login</h2>
          <h4>Email:</h4>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            onChange={this.handleChange}
          />
          <h4 className="paddingTop">Password:</h4>
          <input
            type="password"
            name="pass"
            className="form-control"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button className="btn-default loginBtn" onClick={this.OnCLickLogin}>
            Login
          </button>
          <p>{this.state.error}</p>
        </div>
      );
    }
  }
  async componentDidMount() {
    var temp = false;
    console.log("check login status");
    const reqOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    await fetch("http://localhost:5000/isLoggedIn", reqOptions).then(function (
      response
    ) {
      if (response.status === 200) {
        temp = true;
      }
    });
    console.log("temp value " + temp);
    this.setState({ logStatus: temp });
    console.log(this.state.logStatus);
  }
  async OnCLickLogin() {
    var temp = false;
    if (this.state.email == "" || this.state.pass == "") {
      this.setState({ error: "Please Enter All required Information" });
      console.log("please enter all info");
    } else {
      var data = {
        email: this.state.email,
        pass: this.state.pass,
        type: "user",
      };
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      };
      console.log(data);
      await fetch("http://localhost:5000/login", reqOptions).then(function (
        response
      ) {
        if (response.status === 202) {
          temp = true;
        }
      });
      this.setState({ logStatus: temp });
      if (!temp) {
        this.setState({ error: "Invalid Email Or password" });
      } else {
        this.setState({ error: "" });
      }
    }
  }
}

export default LoginPage;

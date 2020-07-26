import React, { Component } from "react";
import Header from "./header";
import NavBar from "./navbar";
import BodyComponent from "./bodyComp";
import { Redirect } from "react-router-dom";
class OwnerLogin extends Component {
  constructor(props) {
    super(props);
    this.OnCLickLogin = this.OnCLickLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    username: "",
    pass: "",
    logStatus: false,
  };
  handleChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }
  render() {
    if (this.state.logStatus) {
      return <Redirect to="/controlPanel" />;
    } else {
      return (
        <div className="LoginComp MakeBorder">
          <h2>Owner Login</h2>
          <h4>UserName:</h4>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="UserName"
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
    await fetch("http://localhost:5000/ownerAuth", reqOptions).then(function (
      response
    ) {
      if (response.status === 200) {
        temp = true;
      }
    });
    this.setState({ logStatus: temp });
    console.log("is owner login? " + this.state.logStatus);
  }
  async OnCLickLogin() {
    var temp = false;
    if (this.state.username == "" || this.state.pass == "") {
      this.setState({ error: "Please Enter All required Information" });
      console.log("please enter all info");
    } else {
      var data = {
        username: this.state.username,
        pass: this.state.pass,
        type: "owner",
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
    }
  }
}

export default OwnerLogin;

import React, { Component } from "react";
import Header from "./header";
import NavBar from "./navbar";
import BodyComponent from "./bodyComp";
import { Redirect } from "react-router-dom";
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.OnClickSignUp = this.OnClickSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    error: "",
    fullname: "",
    email: "",
    pass: "",
    confirmPass: "",
    logStatus: false,
  };
  handleChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
    if (target.name == "confirmPass") {
      if (target.value != this.state.pass) {
        this.setState({ error: "Password and Confirm Password do not match" });
      } else {
        this.setState({ error: "" });
      }
    }
  }
  render() {
    if (this.state.logStatus) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="LoginComp MakeBorder">
          <h4>UserName:</h4>
          <input
            name="fullname"
            type="text"
            className="form-control"
            placeholder="Full Name"
            onChange={this.handleChange}
          />
          <h4>Email:</h4>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={this.handleChange}
          />
          <h4 className="paddingTop">Password:</h4>
          <input
            name="pass"
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={this.handleChange}
          />

          <h4 className="paddingTop">Confirm Password:</h4>
          <input
            name="confirmPass"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="btn-default loginBtn"
            onClick={this.OnClickSignUp}
          >
            SignUP
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
  OnClickSignUp() {
    if (
      this.state.fullname == "" ||
      this.state.email == "" ||
      this.state.pass == "" ||
      this.state.confirmPass == ""
    ) {
      this.setState({ error: "Please Enter All required Information" });
    } else if (this.state.pass != this.state.confirmPass) {
      this.setState({ error: "Password and Confirm Password do not match" });
    } else {
      var data = {
        fullname: this.state.fullname,
        email: this.state.email,
        pass: this.state.pass,
        type: "user",
      };
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch("http://localhost:5000/signup", reqOptions)
        .then((res) => res.text())
        .then((response) => console.log(response));
    }
  }
}

export default SignUpPage;

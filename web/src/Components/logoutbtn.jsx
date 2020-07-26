import React, { Component } from "react";

class LogOutBtn extends Component {
  constructor(props) {
    super(props);
    this.onClickLogOut = this.onClickLogOut.bind(this);
  }
  state = {
    logStatus: false,
  };
  render() {
    if (this.state.logStatus) {
      return (
        <button className="logout-btn" onClick={this.onClickLogOut}>
          LogOut
        </button>
      );
    } else {
      return <div className="aboutBtn">About</div>;
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
  onClickLogOut() {
    var temp = false;
    if (this.state.logStatus == true) {
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
      fetch("http://localhost:5000/logoutUser", reqOptions).then(function (
        response
      ) {
        if (response.status === 200) {
          temp = true;
        }
      });
      this.setState({ logStatus: temp });
    }
  }
}

export default LogOutBtn;

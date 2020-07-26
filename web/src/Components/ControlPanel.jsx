import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Control extends Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  state = {
    waitforData: null,
    logStatus: false,
  };
  render() {
    if (this.state.waitforData == null) {
      return <div>Loading...</div>;
    } else {
      if (this.state.logStatus) {
        return (
          <div className="width100">
            <ul className="control-list">
              <li>
                <Link to="/Stock">
                  <div>Replenish Stock</div>
                </Link>
              </li>
              <li>
                <Link to="/AddFoodItem">
                  <div>Add Food Item</div>
                </Link>
              </li>
              <li>
                <Link to="/RemoveFoods">
                  <div>Remove Food Item</div>
                </Link>
              </li>
              <li>
                <Link to="addOwner">
                  <div>Add Owner</div>
                </Link>
              </li>
              <li>
                <button onClick={this.onLogoutClick}>Logout</button>
              </li>
            </ul>
          </div>
        );
      } else {
        return <Redirect to="/ownerLogin" />;
      }
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
    console.log("temp value " + temp);
    this.setState({ logStatus: temp });
    this.setState({ waitforData: true });
  }
  onLogoutClick() {
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    fetch("http://localhost:5000/logoutOwner", reqOptions).then(function (
      response
    ) {
      window.location.href = "/";
    });
  }
}

export default Control;

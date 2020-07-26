import React, { Component } from "react";
class NavBar extends Component {
  render() {
    return (
      <div>
        <ul className="navList">
          <li>Home</li>
          <li>About</li>
          <li>
            <input type="text" className="form-control" placeholder="Search" />
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;

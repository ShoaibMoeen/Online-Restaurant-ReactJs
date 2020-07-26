import React, { Component } from "react";
import SideMenu from "./sideMenu";
import MainItems from "./mainItems";
import NavBar from "./navbar";
import OrderBar from "./orderbar";
class BodyComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <div id="mainViewer" className="displayInline width100">
          <SideMenu />
          <div className="mainItems">
            <OrderBar />
            <MainItems />
          </div>
        </div>
      </div>
    );
  }
}

export default BodyComponent;

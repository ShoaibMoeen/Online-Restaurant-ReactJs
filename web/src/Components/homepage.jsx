import React, { Component } from "react";
import Header from "./header";
import NavBar from "./navbar";
import BodyComponent from "./bodyComp";
import LoginPage from "./loginpage";
import SignUpPage from "./signuppage";
import Stock from "./Stock";
import AddFoodItem from "./AddFoodItem";
import RemoveFoods from "./RemoveFoods";
import OwnerLogin from "./ownerLogin";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddOwner from "./AddOwner";
import Control from "./ControlPanel";
import orderList from "./orderCart";
class HomePage extends Component {
  render() {
    return (
      <Router>
        <div className="width100 relativePos">
          <Header />
          <Switch>
            <Route path="/" exact component={BodyComponent} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signUp" component={SignUpPage} />
            <Route path="/Stock" component={Stock} />
            <Route path="/AddFoodItem" component={AddFoodItem} />
            <Route path="/RemoveFoods" component={RemoveFoods} />
            <Route path="/ownerLogin" component={OwnerLogin} />
            <Route path="/addOwner" component={AddOwner} />
            <Route path="/controlPanel" component={Control} />
            <Route path="/orderList" component={orderList} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default HomePage;

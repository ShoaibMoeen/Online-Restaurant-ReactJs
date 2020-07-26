import React, { Component } from "react";
import Fooditems from "./foodItems";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
class OrderListItem extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    foody: this.props.FoodObject,
    quantity: this.props.quantity,
  };
  render() {
    return (
      <div>
        <div className="itemContainer displayInline MakeBorder">
          <img
            className="imgFoodSmall LeftFloat"
            src={this.state.foody.I}
            alt="FoodImg"
          />
          <div className="FoodName LeftFloat">{this.state.foody.N}</div>
          <div className="FoodDesc LeftFloat">{this.state.foody.D}</div>
          <div className="LeftFloat">Quantity: {this.state.quantity}</div>
          <div className="LeftFloat">
            Rs: {this.state.foody.P * this.state.quantity}
          </div>
        </div>
      </div>
    );
  }
}

export default OrderListItem;

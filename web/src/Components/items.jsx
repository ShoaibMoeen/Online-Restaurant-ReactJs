import React, { Component } from "react";
import Fooditems from "./foodItems";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
class Items extends Component {
  constructor(props) {
    super(props);
    this.incQuantity = this.incQuantity.bind(this);
    this.decQuantity = this.decQuantity.bind(this);
    this.onClickOrder = this.onClickOrder.bind(this);
    this.NotEnoghStock = this.NotEnoghStock.bind(this);
  }
  state = {
    i: this.props.img,
    nm: this.props.n,
    foody: this.props.FoodObject,
    quantity: 0,
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
          <div className="LeftFloat">Rs: {this.state.foody.P}</div>
          <button className="amount-btn LeftFloat" onClick={this.decQuantity}>
            -
          </button>
          <div className="item-quantity LeftFloat">{this.state.quantity}</div>
          <button className="amount-btn LeftFloat" onClick={this.incQuantity}>
            +
          </button>
          <div className="item-total LeftFloat">
            Rs: {this.state.foody.P * this.state.quantity}
          </div>
          <button className="order-btn" onClick={this.onClickOrder}>
            Add To Order
          </button>
        </div>
      </div>
    );
  }
  incQuantity() {
    this.setState({ quantity: this.state.quantity + 1 });
  }
  decQuantity() {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  }
  onClickOrder() {
    if (this.state.quantity > 0) {
      if (this.state.quantity > this.state.foody.S) {
        this.NotEnoghStock();
      } else {
        var data = {
          food: this.state.foody,
          quantity: this.state.quantity,
        };
        const reqOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        };
        fetch("http://localhost:5000/addToOrder", reqOptions)
          .then((res) => res.text())
          .then((response) => console.log(response));
      }
    }
  }
  NotEnoghStock() {
    confirmAlert({
      title: "Not Enough Stock For this Item",
      message: "Current Stock For this item is " + this.state.foody.S,
      buttons: [
        {
          label: "Ok",
        },
      ],
    });
  }
}

export default Items;

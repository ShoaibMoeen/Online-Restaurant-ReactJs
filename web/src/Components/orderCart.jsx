import React, { Component } from "react";
import Items from "./items";
import Fooditems from "./foodItems";
import OrderListItem from "./orderListItem";

class orderList extends Component {
  constructor(props) {
    super(props);
    this.checkthis = this.checkthis.bind(this);
  }
  state = {
    cartItems: [],
    logStatus: false,
    waitforData: null,
  };
  render() {
    return (
      <div className="MakeBorder">
        {this.state.cartItems.map((item) => (
          <OrderListItem
            key={item.ID}
            FoodObject={this.getFoodItems(
              item.ID,
              item.N,
              item.P,
              item.I,
              item.D,
              item.C,
              item.S
            )}
            quantity={item.quantity}
          />
        ))}
      </div>
    );
  }
  getFoodItems(id, n, p, i, d, c, s) {
    var temp = new Fooditems(id, n, p, i, d, c, s);
    var a = {
      ID: temp.id,
      N: temp.name,
      P: temp.price,
      I: temp.img,
      D: temp.description,
      C: temp.Cat,
      S: temp.stock,
    };
    console.log(a);
    return a;
  }
  callAPI() {
    const reqOptions = {
      method: "GET",
      "Content-Type": "application/json",
      Accept: "application/json",
      credentials: "include",
    };
    fetch("http://localhost:5000/getCartItems", reqOptions)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          cartItems: json,
        });
      });
  }
  componentDidMount() {
    this.callAPI();
    console.log(this.state.cartItems);
  }
  checkthis() {
    console.log(this.state.cartItems);
  }
}

export default orderList;

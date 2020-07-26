import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class OrderBar extends Component {
  state = {
    order_price: 100,
  };
  render() {
    return (
      <div>
        <div className="order-bar displayInline">
          <div className="order-bar-text">Your Order</div>
          <button className="order-bar-btn" onClick={this.orderviewClick}>
            View Your Order
          </button>
        </div>
      </div>
    );
  }
  orderviewClick() {
    window.location.href = "/orderList";
  }
}

export default OrderBar;

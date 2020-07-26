import React, { Component } from "react";
import StockItem from "./StockItem";
import Fooditems from "./foodItems";
import { Redirect } from "react-router-dom";

class Stock extends Component {
  state = {
    AllFoodItems: [],
    logStatus: false,
    waitforData: null,
  };
  render() {
    if (this.state.waitforData === null) {
      return <div>Loading...</div>;
    } else {
      if (this.state.logStatus) {
        return (
          <div className="MakeBorder">
            {this.state.AllFoodItems.map((item) => (
              <StockItem
                key={item.id}
                FoodObject={this.getFoodItems(
                  item.id,
                  item.name,
                  item.price,
                  item.imageUrl,
                  item.description,
                  item.FoodType,
                  item.stock
                )}
              />
            ))}
          </div>
        );
      } else {
        return <Redirect to="/ownerLogin" />;
      }
    }
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
    fetch("http://localhost:5000/fooditems")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          AllFoodItems: json,
        });
      });
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
    if (temp) {
      this.callAPI();
    }
    console.log("temp value " + temp);
    this.setState({ logStatus: temp });
    this.setState({ waitforData: true });
  }
}

export default Stock;

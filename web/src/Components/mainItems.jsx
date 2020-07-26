import React, { Component } from "react";
import Items from "./items";
import Fooditems from "./foodItems";

class MainItems extends Component {
  state = {
    AllFoodItems: [],
  };
  render() {
    return (
      <div className="MakeBorder">
        {this.state.AllFoodItems.map((item) => (
          <Items
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
  componentWillMount() {
    this.callAPI();
  }
}

export default MainItems;

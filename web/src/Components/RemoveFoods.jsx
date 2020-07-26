import React, { Component } from "react";
import RemoveItem from "./RemoveItem";
import Fooditems from "./foodItems";
import { Redirect } from "react-router-dom";

class RemoveFoods extends Component {
  constructor(props) {
    super(props);
    this.callAPI = this.callAPI.bind(this);
  }
  state = {
    AllFoodItems: [],
    logStatus: false,
    test: "test",
    waitfordata: null,
  };
  render() {
    if (this.state.waitfordata == null) {
      return <div>Loading...</div>;
    } else {
      if (this.state.logStatus) {
        return (
          <div className="MakeBorder">
            {this.state.AllFoodItems.map((item) => (
              <RemoveItem
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
    this.setState({ logStatus: temp });
    if (temp) {
      this.callAPI();
    }
    this.setState({ waitfordata: true });
    console.log(this.state.waitfordata);
  }
}
export default RemoveFoods;

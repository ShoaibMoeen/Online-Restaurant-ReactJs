import React, { Component } from "react";
class StockItem extends Component {
  constructor(props) {
    super(props);
    this.StockChange = this.StockChange.bind(this);
    this.removeFromStock = this.removeFromStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    foody: this.props.FoodObject,
    addition: 0,
  };
  handleChange(event) {
    const target = event.target;
    this.setState({ addition: target.value });
  }
  render() {
    return (
      <div>
        <div className="itemContainer displayInline MakeBorder">
          <img className="imgFoodSmall LeftFloat" src={this.state.foody.I} />
          <div className="FoodName LeftFloat">{this.state.foody.N}</div>
          <div className="FoodDesc LeftFloat">{this.state.foody.D}</div>
          <div className="LeftFloat">Rs: {this.state.foody.P}</div>
          <div className="LeftFloat">Stock: {this.state.foody.S}</div>
          <input
            type="number"
            min="0"
            name="NumToAdd"
            className="LeftFloat"
            value={this.state.addition}
            onChange={this.handleChange}
          ></input>
          <div className="displayInline display-block">
            <button
              className="order-btn"
              style={{ marginBottom: "10px", width: "80px" }}
              name="addBtn"
              onClick={this.StockChange}
            >
              Add
            </button>
            <button
              className="order-btn"
              style={{ width: "80px" }}
              name="remBtn"
              onClick={this.StockChange}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
  StockChange(event) {
    console.log(this.state.addition);
    const target = event.target;

    if (this.state.addition > 0) {
      var afterStock = this.state.foody.S;
      if (target.name == "addBtn") {
        afterStock = +afterStock + +this.state.addition;
      } else if (target.name == "remBtn") {
        if (afterStock < this.state.addition) {
          return;
        }
        afterStock = +afterStock - +this.state.addition;
      }
      console.log(afterStock);
      var data = {
        foodId: this.state.foody.ID,
        TotalStock: afterStock,
      };
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch("http://localhost:5000/AddStock", reqOptions)
        .then((res) => res.text())
        .then((response) => console.log(response));
      this.setState((prevState) => {
        let foody = Object.assign({}, prevState.foody);
        foody.S = afterStock;
        return { foody };
      });
      this.setState({ addition: 0 });
    }
  }
  removeFromStock() {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  }
}

export default StockItem;

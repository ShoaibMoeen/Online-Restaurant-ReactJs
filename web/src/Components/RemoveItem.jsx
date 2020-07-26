import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class RemoveItem extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.RemoveIt = this.RemoveIt.bind(this);
    this.renderState = true;
  }
  state = {
    foody: this.props.FoodObject,
  };
  componentWillMount() {
    this.setState({ renderState: true });
  }
  submit() {
    confirmAlert({
      title: "Delete Food Item",
      message: "Click Yes To Confirm",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.RemoveIt(),
        },
        {
          label: "No",
        },
      ],
    });
  }
  handleChange(event) {
    const target = event.target;
    this.setState({ addition: target.value });
  }
  render() {
    if (this.state.renderState === true) {
      return (
        <div>
          <div className="itemContainer displayInline MakeBorder">
            <img className="imgFoodSmall LeftFloat" src={this.state.foody.I} />
            <div className="FoodName LeftFloat">{this.state.foody.N}</div>
            <div className="FoodDesc LeftFloat">{this.state.foody.D}</div>
            <div className="LeftFloat">Rs: {this.state.foody.P}</div>
            <div className="LeftFloat">Stock: {this.state.foody.S}</div>
            <div id="removeBtn">
              <button
                className="order-btn"
                style={{ width: "120px" }}
                name="addBtn"
                onClick={this.submit}
              >
                Remove Food
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
  RemoveIt() {
    var data = {
      foodId: this.state.foody.ID,
    };
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:5000/RemoveFoodItem", reqOptions)
      .then((res) => res.text())
      .then((response) => console.log(response));

    this.setState({ renderState: false });
  }
}

export default RemoveItem;

import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class AddFoodItem extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.OnClickAdd = this.OnClickAdd.bind(this);
  }
  state = {
    name: "",
    desc: "",
    img: "",
    cat: "",
    price: "",
    stock: "",
    waitforData: null,
    logStatus: false,
  };
  handleChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }
  render() {
    if (this.state.waitforData === null) {
      return <div>Loading...</div>;
    } else {
      if (this.state.logStatus) {
        return (
          <div className="LoginComp MakeBorder">
            <h4>Name:</h4>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Food Name"
              onChange={this.handleChange}
            />
            <h4 className="paddingTop">Description:</h4>
            <input
              name="desc"
              type="text"
              className="form-control"
              placeholder="Description"
              onChange={this.handleChange}
            />
            <h4 className="paddingTop">imageUrl:</h4>
            <input
              name="img"
              type="text"
              className="form-control"
              placeholder="Image Url"
              onChange={this.handleChange}
            />
            <h4 className="paddingTop">Food Category:</h4>
            <input
              name="cat"
              type="text"
              className="form-control"
              placeholder="Food Category"
              onChange={this.handleChange}
            />

            <h4 className="paddingTop">Price:</h4>
            <input
              name="price"
              type="number"
              className="form-control"
              placeholder="Price"
              onChange={this.handleChange}
            />
            <h4 className="paddingTop">Initial Stock:</h4>
            <input
              name="stock"
              type="number"
              className="form-control"
              placeholder="Initial Stock"
              onChange={this.handleChange}
            />
            <button
              type="submit"
              className="btn-default loginBtn"
              onClick={this.OnClickAdd}
            >
              Add To Foods
            </button>
            <p>{this.state.error}</p>
          </div>
        );
      } else {
        return <Redirect to="/ownerLogin" />;
      }
    }
  }
  OnClickAdd() {
    var data = {
      itemName: this.state.name,
      itemDesc: this.state.desc,
      itemImg: this.state.img,
      itemCat: this.state.cat,
      itemPrice: this.state.price,
      itemStock: this.state.stock,
    };
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:5000/AddFoodItem", reqOptions)
      .then((res) => res.text())
      .then((response) => console.log(response));
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
    console.log("temp value " + temp);
    this.setState({ logStatus: temp });
    this.setState({ waitforData: true });
  }
}

export default AddFoodItem;

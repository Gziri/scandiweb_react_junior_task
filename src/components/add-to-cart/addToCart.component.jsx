import React, { Component } from "react";
import "./addToCart.styles.sass";

import Icon from "../../assets/icons/shopping-cart.svg";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

class AddToCart extends Component {
  addItemWithFirstAttribute = () =>
    this.props.addItem({
      ...this.props.details,
      chosenAttributes: this.props.details.attributes.reduce(
        (acc, attributes) => {
          acc[attributes.name] = attributes.items[0].value;

          return acc;
        },
        {}
      ),
    });

  render() {
    return (
      <div onClick={this.addItemWithFirstAttribute}>
        <img src={Icon} alt="" />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(AddToCart);

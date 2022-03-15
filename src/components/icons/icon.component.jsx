import React, { Component } from "react";
import "./icon.styles.sass";

import Icon from "../../assets/icons/shopping-cart.svg";
import BlackIcon from "../../assets/icons/shopping-cart-black.svg";
import shopIcon from "../../assets/icons/shop.svg";

export class CartIcon extends Component {
  render() {
    return (
      <div>
        <img src={this.props.color ? BlackIcon : Icon} alt="CartIcon" />
      </div>
    );
  }
}

export class ShopIcon extends Component {
  render() {
    return (
      <div>
        <img src={shopIcon} alt="shopIcon" />
      </div>
    );
  }
}

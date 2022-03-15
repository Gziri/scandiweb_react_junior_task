import React, { Component } from "react";
import "./category-item.styles.sass";

import AddToCart from "../add-to-cart/addToCart.component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrency } from "../../redux/currency-picker/currency.selectors";

class Categoryitem extends Component {
  priceFilterHandler = (curr, info) => {
    let displayPrice = info.prices.filter(
      (c) => c.currency.label === curr.selectedCurrency.value
    );

    return displayPrice[0].currency.symbol + " " + displayPrice[0].amount;
  };

  render() {
    let info = this.props.info;
    return (
      <div className="categoryItemContainer">
        <Link style={{ textDecoration: "none", color: "#1D1F22" }} to={"pdp"}>
          <div className="categoryItemPicture">
            {info.inStock ? null : (
              <div className="outOfStock">
                <span>OUT OF STOCK</span>
              </div>
            )}
            <img src={info.gallery[0]} alt={info.name} />
          </div>
          <div
            className={`${
              info.inStock ? null : "outOfStockAdditional"
            } categoryItemDetails`}
          >
            <div className="categoryItemName">{info.name}</div>
            <div className="categoryItemPrice">
              {this.priceFilterHandler(this.props.currency, info)}
            </div>
          </div>
          <div className="clickableArea" onClick={this.props.click} />
        </Link>
        {info.inStock ? (
          <div className="addToCartButton">
            <AddToCart details={info} />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (state) => ({
  currency: selectCurrency(state),
});

export default connect(mapDispatchToProps)(Categoryitem);

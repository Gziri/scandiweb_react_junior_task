import React, { Component } from "react";
import "./header.styles.sass";

import Currency from "../currency/currency.component";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  editItems,
  addItem,
  toggleCartHidden,
} from "../../redux/cart/cart.actions";
import {
  selectCartHidden,
  selectCartItemsCount,
} from "../../redux/cart/cart.selectors";
import Backdrop from "../backdrop/backdrop.component";
import { CartIcon, ShopIcon } from "../icons/icon.component";
import { changeCategory } from "../../redux/category/categoty.actions";

import { withRouter } from "../withRouter";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCategory: "all",
    };
  }
  categoryClickHandler = (cat) => {
    this.setState({ activeCategory: cat });
    this.props.changeCategory(cat);
  };
  render() {
    const categoriesList = ["All","Tech","Clothes"];
    if (this.state.activeCategory === "") {
      this.setState({ activeCategory: categoriesList[0] });
    }
    const currencies = [
      { label: "USD", symbol: "$" },
      { label: "GBP", symbol: "£" },
      { label: "AUD", symbol: "A$" },
      { label: "JPY", symbol: "¥" },
      { label: "RUB", symbol: "₽" },
    ];

    

    return (
      <div className="header">
        <div className="categories">
          {categoriesList &&
            categoriesList.map((c) => (
              <Link
                to={"/"}
                className={`${
                  c === this.state.activeCategory ? "activeCategory" : null
                } categoryElement`}
                key={c}
                onClick={() => this.categoryClickHandler(c)}
              >
                <span> {c}</span>
              </Link>
            ))}
        </div>
        <Link to="/" className="logo">
          <ShopIcon />
        </Link>
        <div className="rightWrapper">
          <div className="currency">
            <Currency currencies={currencies} />
          </div>

          <div
            className="cartIcon"
            onClick={() =>
              this.props.location.pathname !== "/cart"
                ? this.props.toggleCartHidden()
                : null
            }
          >
            <CartIcon color={true} />
            <div className="quantityBadge">
              <div className="quantityText">{this.props.quantity}</div>
            </div>
          </div>
        </div>
        {this.props.hidden ? null : (
          <Backdrop click={() => this.props.toggleCartHidden()} />
        )}
      </div>
    );
  }
}

const mapDistpatchToProps = (dispatch) => ({
  changeSize: (item) => dispatch(editItems(item)),
  add: (item) => dispatch(addItem(item)),
  toggleCartHidden: (item) => dispatch(toggleCartHidden(item)),
  changeCategory: (item) => dispatch(changeCategory(item)),
});

const mapStateToProps = (state) => ({
  hidden: selectCartHidden(state),
  quantity: selectCartItemsCount(state),
});

export default connect(
  mapStateToProps,
  mapDistpatchToProps
)(withRouter(Header));

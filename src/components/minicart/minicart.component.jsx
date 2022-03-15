import React, { Component } from "react";
import "./minicart.styles.sass";
import { connect } from "react-redux";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import CartItem from "../cart-item/cart-item.component";
import Scrollbars from "react-custom-scrollbars";
import { addItem, removeItem } from "../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

class Minicart extends Component {
  render() {
    const mapCartItems = (cartItems) => {
      return (
        <div className="cartItems">
          <Scrollbars
            className="scrollbar"
            autoHide
            autoHideTimeout={1000}
            style={{ width: "100%", height: "100%" }}
          >
            {cartItems.map((item) => {
              return (
                <div key={item.id + Math.random()}>
                  <CartItem
                    item={item}
                    key={item.id + "cartItems"}
                    increase={() => this.props.increaseQuantity(item)}
                    decrease={() => this.props.decreaseQuantity(item)}
                  />
                </div>
              );
            })}
          </Scrollbars>
        </div>
      );
    };

    return (
      <div className="minicart">
        <div className="topPart">
          <div className="Name">My Bag.</div>
          <div className="itemCount">{this.props.itemCount} items</div>
        </div>
        {this.props.itemCount > 0 ? (
          mapCartItems(this.props.cartItems)
        ) : (
          <div className="noItems">No items to show</div>
        )}
        <div className="total">
          <span>Total:</span>
          <span>{this.props.total}</span>
        </div>
        <div className="buttons">
          <Link to="/cart">
            <button
              className="viewBag bothButtons"
              onClick={this.props.hideBackdrop}
            >
              {" "}
              VIEW BAG
            </button>
          </Link>
          <button className="checkOut bothButtons">CHECK OUT</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  itemCount: selectCartItemsCount,
  total: selectCartTotal,
});

const mapDispatchToProps = (dispatch) => ({
  increaseQuantity: (item) => dispatch(addItem(item)),
  decreaseQuantity: (item) => dispatch(removeItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);

import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem, editItems, removeItem } from "../../redux/cart/cart.actions";
import {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import "./cart.styles.sass";
import Carousel from "../../components/carousel/carousel.component";

import _ from "underscore";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [...this.props.cart],
    };
  }

  updateAttributesHandler = (
    type,
    value,
    previousStateChosenAttributes,
    localItem
  ) => {
    let stateItem = this.state.products.find((x) => _.isEqual(x, localItem));
    let attr = { ...stateItem.chosenAttributes, [type.name]: value };
    let filteredState = [
      ...this.state.products.filter(
        (x) =>
          x.id !== stateItem.id &&
          x.chosenAttributes !== stateItem.chosenAttributes
      ),
    ];
    this.setState({
      ...this.state,
      products: [
        ...filteredState,
        { ...stateItem, chosenAttributes: { ...attr } },
      ],
    });
    this.props.updateItem({
      ...stateItem,
      chosenAttributes: { ...attr },
      previousStateChosenAttributes,
    });
  };

  textAttributeHandler = (a, chosenAttributes, id) => {
    return a?.name !== "color"
      ? a.items.map((i) => {
          let stateFull = this.state.products.length > 0;
          let localItem = stateFull
            ? this.state.products?.find(
                (item) =>
                  item.id === id &&
                  item.chosenAttributes[a.name] === chosenAttributes[a.name]
              )
            : false;
          return (
            <div
              key={i.id + "Key"}
              className={`detailTextItem ${
                localItem.chosenAttributes
                  ? localItem.chosenAttributes[a.name] === i.value
                    ? "chosenText"
                    : ""
                  : ""
              }`}
              onClick={() =>
                this.updateAttributesHandler(
                  a,
                  i.value,
                  chosenAttributes,
                  localItem
                )
              }
            >
              <div>{i.displayValue}</div>
            </div>
          );
        })
      : null;
  };

  switchAttributeHandler = (a, chosenAttributes, id) => {
    let stateFull = this.state.products.length > 0;
    let localItem = stateFull
      ? this.state.products?.find(
          (item) =>
            item.id === id && _.isEqual(item.chosenAttributes, chosenAttributes)
        )
      : {};

    return a.items.map((i) => {
      const color =
        i.value === "#000000" || i.value === "#030BFF" ? "white" : "black";
      const isChosen = localItem.chosenAttributes
        ? localItem.chosenAttributes[a.name] === i.value
        : false;
      return (
        <div className="detailSwatchItem" key={i.id + "Swatch"}>
          <div
            className={`swatchItem ${isChosen ? "chosenSwatch" : ""} `}
            onClick={() =>
              this.updateAttributesHandler(
                a,
                i.value,
                chosenAttributes,
                localItem
              )
            }
            style={{
              backgroundColor: i.value,
              color: color,
            }}
          />
          <div className={` ${isChosen ? "boldSwatchName" : "swatchName"} `}>
            {i.displayValue}
          </div>
        </div>
      );
    });
  };

  productOptions = (item) => {
    return item.attributes.map((a) => {
      return (
        <div key={a.id + "Option"} className="">
          <p style={{ fontWeight: "bold" }}>{a.name.toUpperCase()}:</p>
          <div className="detailsContainer">
            {a.type === "text"
              ? this.textAttributeHandler(a, item.chosenAttributes, item.id)
              : this.switchAttributeHandler(a, item.chosenAttributes, item.id)}
          </div>
        </div>
      );
    });
  };

  render() {
    const cartItems = (item) => (
      <div key={item.key + "" + Math.random(0, 1)} className="itemContainer">
        <div className="leftPart">
          <div className="brand">{item.brand}</div>
          <div className="name">{item.name}</div>
          <div className="price">{item.prices[0].amount}</div>
          <div className="attributes">
            {item.attributes ? this.productOptions(item) : null}
          </div>
        </div>
        <div className="rightPart">
          <div className="counter">
            <div
              className="changeAmount"
              onClick={() => this.props.addItem(item)}
            >
              +
            </div>
            <div className="quantity">{item.quantity}</div>
            <div
              className="changeAmount"
              onClick={() => this.props.removeItem(item)}
            >
              -
            </div>
          </div>

          <div className="image">
            <div
              style={{
                maxWidth: 141,
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 64,
              }}
            >
              <Carousel>
                {item.gallery.map((image) => (
                  <img src={image} alt="" key={image} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container">
        <h1>CART</h1>
        <div className="cartItems">
          {this.props.cart.map((cartItem) => cartItems(cartItem))}
        </div>
        <div className="total">
          <span>Total: </span>
          {this.props.total} ({this.props.itemCount} Items)
        </div>

        <button className="checkOut">CHECK OUT</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: selectCartItems(state),
  total: selectCartTotal(state),
  itemCount: selectCartItemsCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  updateItem: (item) => dispatch(editItems(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

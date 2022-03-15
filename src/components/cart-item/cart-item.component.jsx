import React, { Component } from "react";
import { connect } from "react-redux";
import { editItems } from "../../redux/cart/cart.actions";
import { selectCurrency } from "../../redux/currency-picker/currency.selectors";
import "./cart-item.styles.sass";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.item.gallery[0],
      product: { ...props.item },
    };
  }

  updateAttributesHandler = (type, value, previousStateChosenAttributes) => {
    let attr = { ...this.state.product.chosenAttributes, [type.name]: value };
    this.setState({
      ...this.state,
      product: { ...this.state.product, chosenAttributes: { ...attr } },
    });

    this.props.updateItem({
      ...this.state.product,
      chosenAttributes: { ...attr },
      previousStateChosenAttributes,
    });
  };

  priceFilterHandler = (curr, product) => {
    let displayPrice = product.prices.filter(
      (c) => c.currency.label === curr.selectedCurrency.value
    );

    return displayPrice[0].currency.symbol + " " + displayPrice[0].amount;
  };

  textAttributeHandler = (a, chosenAttributes) => {
    return a?.name === "Size" || a?.name === "Capacity"
      ? a.items.map((i) => (
          <div
            key={i.id}
            className={`detailTextItem ${
              this.state.product.chosenAttributes
                ? this.state.product.chosenAttributes[a.name] === i.value
                  ? "chosenText"
                  : ""
                : ""
            }`}
            onClick={() =>
              this.updateAttributesHandler(a, i.value, chosenAttributes)
            }
          >
            <div>{i.displayValue}</div>
          </div>
        ))
      : null;
  };

  switchAttributeHandler = (a, chosenAttributes) => {
    return a.items.map((i) => {
      const colour =
        i.value === "#000000" || i.value === "#030BFF" ? "white" : "black";
      const isChosen = this.state.product.chosenAttributes[a.name] === i.value;
      return (
        <div className="detailSwatchItem" key={i.id}>
          <div
            className={`swatchItem ${isChosen ? "chosenSwatch" : ""} `}
            onClick={() =>
              this.updateAttributesHandler(a, i.value, chosenAttributes)
            }
            style={{ backgroundColor: i.value, color: colour }}
          />

          <div
            className={` ${isChosen ? "boldSwatchName" : "swatchName"} `}
            title={i.displayValue}
          ></div>
        </div>
      );
    });
  };

  productOptions = (attributes, chosenAttributes) => {
    return attributes.map((a) => {
      return (
        <div key={a.id} className="detailsContainer">
          {a.type === "text"
            ? this.textAttributeHandler(a, chosenAttributes)
            : this.switchAttributeHandler(a, chosenAttributes)}
        </div>
      );
    });
  };

  render() {
    const item = this.props.item;
    return (
      <div className="cartItem" key={item.id + Math.random()}>
        <div className="leftPart">
          <div className="brandName">{item.brand}</div>
          <div className="itemName">{item.name}</div>
          <div className="price">
            {this.priceFilterHandler(this.props.currency, item)}
          </div>
          <div className="productOptions">
            {item.attributes
              ? this.productOptions(item.attributes, item.chosenAttributes)
              : null}
          </div>
        </div>

        <div className="middlePart">
          <div className="quantityUpdater" onClick={this.props.increase}>
            +
          </div>
          {item.quantity}
          <div className="quantityUpdater" onClick={this.props.decrease}>
            -
          </div>
        </div>
        <div className="rightPart">
          <img src={item.gallery[0]} alt="" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: selectCurrency(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateItem: (item) => dispatch(editItems(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

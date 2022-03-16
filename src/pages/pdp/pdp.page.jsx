import React, { Component } from "react";
import "./pdp.styles.sass";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProductID } from "../../redux/product-description/pd.selectors";

import { Scrollbars } from "react-custom-scrollbars";
import { addItem } from "../../redux/cart/cart.actions";
import { selectCurrency } from "../../redux/currency-picker/currency.selectors";

import parser from "html-react-parser";

import { graphWrapper } from "../../components/HOC/graphWrapper";

class Pdp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.product.gallery[0],
      product: { ...this.props.product, chosenAttributes: {} },
    };
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  updateImageHandler = (link) => {
    this.setState({ ...this.state, image: link });
  };

  updateAttributesHandler = (type, value) => {
    let attr = { ...this.state.product.chosenAttributes, [type]: value };
    this.setState({
      ...this.state,
      product: { ...this.state.product, chosenAttributes: attr },
    });
  };

  textAttributeHandler = (a) => {
    return a.items.map((i) => (
      <div
        key={i.id}
        className={`detailTextItem ${
          this.state.product.chosenAttributes
            ? this.state.product.chosenAttributes[a.name] === i.value
              ? "chosenText"
              : ""
            : ""
        }`}
        onClick={() => this.updateAttributesHandler(a.name, i.value)}
      >
        <div>{i.displayValue}</div>
      </div>
    ));
  };

  switchAttributeHandler = (a) => {
    return a.items.map((i) => {
      const colour =
        i.value === "#000000" || i.value === "#030BFF" ? "white" : "black";
      const isChosen = this.state.product.chosenAttributes[a.name] === i.value;
      return (
        <div className="detailSwatchItem" key={i.id}>
          <div
            className={`swatchItem ${isChosen ? "chosenSwatch" : ""} `}
            onClick={() => this.updateAttributesHandler(a.name, i.value)}
            style={{ backgroundColor: i.value, color: colour }}
          />

          <div className={` ${isChosen ? "boldSwatchName" : "swatchName"} `}>
            {i.displayValue}
          </div>
        </div>
      );
    });
  };

  productOptions = (attributes) => {
    return attributes.map((a) => {
      return (
        <div key={a.id} className="">
          <p className="attributeName">{a.name.toUpperCase()}:</p>
          <div className="detailsContainer">
            {a.type === "text"
              ? this.textAttributeHandler(a)
              : this.switchAttributeHandler(a)}
          </div>
        </div>
      );
    });
  };

  priceFilterHandler = (curr, product) => {
    let displayPrice = product.prices.filter(
      (c) => c.currency.label === curr.selectedCurrency.value
    );

    return displayPrice[0].currency.symbol + " " + displayPrice[0].amount;
  };

  addItemToCartHandler = (product, localProduct) => {
  
    product.attributes.length ===
    Object.keys(localProduct.chosenAttributes).length
      ? this.props.addItem(localProduct)
      : alert("Please choose all attributes");
  };

  render() {
    const product = this.props.product;

    return (
      <div className="descriptionContainer">
        <div className="productAdditionalPictures">
          <Scrollbars className="scrollbar" autoHide autoHideTimeout={1000}>
            {product.gallery.map((i) => (
              <img
                key={i}
                src={i}
                alt="Additional pictures"
                onClick={() => this.updateImageHandler(i)}
              />
            ))}
          </Scrollbars>
        </div>
        <div className="productMainPicture">
          <img src={this.state.image} alt="" />
        </div>
        <div className="productDetails">
          <div className="brandName">{product.brand}</div>
          <div className="productName">{product.name}</div>
          <div className="productOptions">
            {this.productOptions(product.attributes)}
          </div>
          <div className="productPrice">
            <p>Price:</p>
            {this.priceFilterHandler(this.props.currency, product)}
          </div>
          <div className="addToCartButton">
            <button
              onClick={() =>
                this.addItemToCartHandler(product, this.state.product)
              }
              disabled={product.inStock ? false : true}
              className={product.inStock ? null : "disabled"}
            >
              ADD TO CART
            </button>
          </div>
          <div
            className={`${
              product.description.length < 100
                ? "productDescription"
                : "productLongDescription"
            }`}
          >
            {parser(product.description)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  desc: selectProductID,
  currency: selectCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(graphWrapper(Pdp));

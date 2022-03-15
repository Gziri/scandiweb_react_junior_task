import React, { Component } from "react";
import "./currency.styles.sass";
import Select from "react-select";
import { connect } from "react-redux";
import { selectCurrency } from "../../redux/currency-picker/currency.selectors";
import { setCurrency } from "../../redux/currency-picker/currency.actions";

class Currency extends Component {
  handleChange = (selectedOption) => {
    this.props.setCurrency({
      value: selectedOption.value,
      label: this.handleSelectedOptionLabel(selectedOption.label),
    });
  };

  handleSelectedOptionLabel = (option) => {
    return option.includes("A$") ? "A$" : option.slice(0, 1);
  };

  render() {
    const options = this.props.currencies
      .map(
        (c) =>
          {const obj = {
            value: c.currency.label,
            label: c.currency.symbol + c.currency.label,
          }
          return obj }
      )
      .filter((c) => c.value !== this.props.currecy.selectedCurrency.value);

    return (
      <div>
        <Select
          className="currencyPicker"
          value={this.props.currecy.selectedCurrency}
          onChange={this.handleChange}
          options={options}
          styles={{
            control: (provided, state) => ({
              ...provided,
              boxShadow: "none",
              border: "none",
            }),
            menu: (provided, state) => ({
              ...provided,
              border: "none",
              boxShadow: "none",
              textAlign: "center",
            }),
          }}
          isSearchable={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currecy: selectCurrency(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrency: (item) => dispatch(setCurrency(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Currency);

import CurrencyActionTypes from "./currency.types";

const INITIAL_STATE = {
  selectedCurrency: { value: "USD", label: "$" },
};

const currecyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CurrencyActionTypes.SET_NEW_CURRENCY:
      return {
        selectedCurrency: action.payload,
      };
    default:
      return state;
  }
};

export default currecyReducer;

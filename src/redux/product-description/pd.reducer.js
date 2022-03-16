import ProductActionTypes from "./pd.types";

const INITIAL_STATE = {
  productID: {},
};

const pdReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.PUSH_PRODUCT_DESCRIPTION:
      return {
        productID: action.payload,
      };
      default:
        return state
  }
};

export default pdReducer;

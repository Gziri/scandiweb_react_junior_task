import ProductActionTypes from "./pd.types";

const INITIAL_STATE = {
  productToDescribe: {},
};

const pdReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.PUSH_PRODUCT_DESCRIPTION:
      return {
        productToDescribe: action.payload,
      };
      default:
        return state
  }
};

export default pdReducer;

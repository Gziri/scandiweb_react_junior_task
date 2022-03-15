import ProductActionTypes from "./pd.types";

export const pushDescription = (item) => ({
  type: ProductActionTypes.PUSH_PRODUCT_DESCRIPTION,
  payload: item,
});

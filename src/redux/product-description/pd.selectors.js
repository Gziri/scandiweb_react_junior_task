import { createSelector } from "reselect";

const selectPd = (state) => state.productToDescribe;

export const selectProductID = createSelector(
  [selectPd],
  (pd) => pd.productID
);

import { createSelector } from "reselect";

const selectPd = (state) => state.productToDescribe;

export const selectProductDescription = createSelector(
  [selectPd],
  (pd) => pd.productToDescribe
);

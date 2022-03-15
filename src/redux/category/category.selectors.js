import { createSelector } from "reselect";

const selectStateCategory = (state) => state.category;

export const selectCategory = createSelector(
  [selectStateCategory],
  (category) => category.category
);

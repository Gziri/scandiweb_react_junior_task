import { createSelector } from "reselect";

const selectCart = (state) => state.cart;
const selectCurrency = (state) => state.currency.selectedCurrency;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((aQ, cartItem) => aQ + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems, selectCurrency],
  (cartItems, currency) => {
    // let prices
    const priceByCurrency = (item) =>
      item.prices.filter((price) => price.currency.label === currency.value)[0];

    return (
      currency.label +
      cartItems
        .reduce(
          (aQ, cartItem) =>
            aQ + cartItem.quantity * priceByCurrency(cartItem).amount,
          0
        )
        .toFixed(2)
    );
  }
);

import CurrencyActionTypes from "./currency.types";

export const setCurrency = (item)=>({
    type: CurrencyActionTypes.SET_NEW_CURRENCY,
    payload: item
})
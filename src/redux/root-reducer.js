import { combineReducers } from "redux";

import cartReducer from "./cart/cart.reducer";
import categoryReducer from "./category/category.reducer";
import pdReducer from "./product-description/pd.reducer";
import currecyReducer from "./currency-picker/currency.reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['cart',"productToDescribe","category"]
};
const rootReducer = combineReducers({
  cart: cartReducer,
  productToDescribe: pdReducer,
  category: categoryReducer,
  currency: currecyReducer
})

export default persistReducer(persistConfig,rootReducer)

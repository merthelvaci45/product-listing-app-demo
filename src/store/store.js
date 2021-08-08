import { configureStore } from "@reduxjs/toolkit";

import { cartReducer, productsReducer } from "./slices";

const store = configureStore({
  reducer: { productsSlice: productsReducer, cartSlice: cartReducer },
});

export default store;

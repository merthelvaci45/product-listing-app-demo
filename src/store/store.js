import { configureStore } from "@reduxjs/toolkit";

import { cartReducer, productsReducer, paginationReducer } from "./slices";

const store = configureStore({
  reducer: {
    productsSlice: productsReducer,
    cartSlice: cartReducer,
    paginationSlice: paginationReducer,
  },
});

export default store;

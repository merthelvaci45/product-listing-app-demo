import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [] };

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    populateProducts(state, action) {
      state.products = [...action.payload.products];
    },
  },
});

export const productsReducer = productsSlice.reducer;
export const productsActions = productsSlice.actions;

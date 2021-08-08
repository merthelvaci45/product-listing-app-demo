import { createSlice } from "@reduxjs/toolkit";

import { initialSortingRadioButtonsState, SORT_OPTIONS_IDS } from "../../utils";

const initialState = {
  products: [],
  sortingOptions: initialSortingRadioButtonsState,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    populateProducts(state, action) {
      state.products = [...action.payload.products];
    },
    sortProductsBy(state, action) {
      const { selectedSortingOption } = action.payload;
      state.sortingOptions = {
        ...initialSortingRadioButtonsState,
        [selectedSortingOption]: true,
      };

      let sortedProducts = [...state.products];
      switch (selectedSortingOption) {
        case SORT_OPTIONS_IDS.ASCENDING_PRICE:
          sortedProducts.sort((first, second) => first.price - second.price);
          break;

        case SORT_OPTIONS_IDS.DESCENDING_PRICE:
          sortedProducts.sort((first, second) => second.price - first.price);
          break;

        case SORT_OPTIONS_IDS.TO_OLDEST:
          sortedProducts.sort((first, second) => first.added - second.added);
          break;

        case SORT_OPTIONS_IDS.TO_NEWEST:
          sortedProducts.sort((first, second) => second.added - first.added);
          break;

        default:
          break;
      }
      state.products = sortedProducts;
    },
  },
});

export const productsReducer = productsSlice.reducer;
export const productsActions = productsSlice.actions;

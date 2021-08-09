import { createSlice } from "@reduxjs/toolkit";

import { initialSortingRadioButtonsState, SORT_OPTIONS_IDS } from "../../utils";

const initialState = {
  products: [],
  //filteredProducts: [], ==> DECIDED TO HAVE NO FUNCTIONALITY, BUT KEPT HERE FOR REFERENCE ANYWAY...
  productsInPage: [],
  mugTypeProducts: [],
  shirtTypeProducts: [],
  sortingOptions: initialSortingRadioButtonsState,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts(state, action) {
      state.products = [...action.payload.products];
    },
    fetchProductsForPage(state, action) {
      const { pageNumber, itemType } = action.payload;
      const totalNumberOfProducts = state.products.length;
      state.mugTypeProducts = state.products.slice(
        0,
        totalNumberOfProducts / 2
      );
      state.shirtTypeProducts = state.products.slice(
        totalNumberOfProducts / 2,
        totalNumberOfProducts
      );
      state.productsInPage =
        itemType === "mug"
          ? state.mugTypeProducts.slice((pageNumber - 1) * 16, 16 * pageNumber)
          : state.shirtTypeProducts.slice(
              (pageNumber - 1) * 16,
              16 * pageNumber
            );
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
    filterProductsBy(state, action) {
      let allProducts = [...state.products];
      const { brandsCheckboxStates } = action.payload;

      if (!brandsCheckboxStates.All) {
        let filteredProducts = allProducts.filter(
          (product) => brandsCheckboxStates[product.manufacturer]
        );
        state.products = filteredProducts;
      } else {
        console.log("state.products: ", state.products);
        state.products = allProducts;
      }
    },
  },
});

export const productsReducer = productsSlice.reducer;
export const productsActions = productsSlice.actions;

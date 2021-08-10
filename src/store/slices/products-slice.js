import { createSlice } from "@reduxjs/toolkit";

import { initialSortingRadioButtonsState, SORT_OPTIONS_IDS } from "../../utils";

const initialState = {
  products: [],
  filteredProducts: [],
  productsInPage: [], // state to hold products which are displayed only for current page
  mugTypeProducts: [],
  shirtTypeProducts: [],
  sortingOptions: initialSortingRadioButtonsState,
  isBrandFilteringApplied: false,
  isTagFilteringApplied: false,
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
      const availableProducts =
        !state.isBrandFilteringApplied && !state.isTagFilteringApplied
          ? state.products
          : state.filteredProducts;
      state.mugTypeProducts = availableProducts.filter(
        (product) => product.itemType === "mug"
      );
      state.shirtTypeProducts = availableProducts.filter(
        (product) => product.itemType === "shirt"
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
      const isFilteringApplied =
        state.isTagFilteringApplied || state.isBrandFilteringApplied;

      const sortedProducts = isFilteringApplied
        ? [...state.filteredProducts]
        : [...state.products];
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
      if (isFilteringApplied) {
        state.filteredProducts = sortedProducts;
      } else {
        state.products = sortedProducts;
      }
    },
    filterProductsBy(state, action) {
      const { brandsCheckboxStates, tagsCheckboxStates } = action.payload;

      /**
       * Since "brandsCheckboxStates" is an empty object for the 1st render,
       * this extra if check is used here, i.e, filtering action should only
       * be applied when "brandsCheckboxStates" is populated with proper
       * checkbox states. Checking "brandsCheckboxStates.hasOwnProperty('All')"
       * boolean value will state that whether "brandsCheckboxStates" object
       * has finished being populated or not.
       * ------------------------------------------------------------------------
       * Using the same logic, since "tagsCheckboxStates" is an empty object
       * for the 1st render, this extra if check is used here, i.e, filtering
       * action should only be applied when "tagsCheckboxStates" is populated
       * with proper checkbox states. Checking "tagsCheckboxStates.hasOwnProperty('All')"
       * boolean value will state that whether "tagsCheckboxStates" object
       * has finished being populated or not.
       */
      if (
        brandsCheckboxStates.hasOwnProperty("Brands - All") &&
        tagsCheckboxStates.hasOwnProperty("Tags - All")
      ) {
        if (!brandsCheckboxStates["Brands - All"]) {
          state.isBrandFilteringApplied = true;
          if (
            Object.values(brandsCheckboxStates).every(
              (checkboxState) => !checkboxState
            )
          ) {
            state.filteredProducts = [];
          } else {
            const filteredProducts = [...state.products].filter(
              (product) => brandsCheckboxStates[product.manufacturer]
            );
            state.filteredProducts = filteredProducts;
          }
        } else {
          state.isBrandFilteringApplied = false;
        }

        if (!tagsCheckboxStates["Tags - All"]) {
          state.isTagFilteringApplied = true;
          if (
            Object.values(tagsCheckboxStates).every(
              (checkboxState) => !checkboxState
            )
          ) {
            state.filteredProducts = [];
          } else {
            const availableProducts = state.isBrandFilteringApplied
              ? [...state.filteredProducts]
              : [...state.products];
            const filteredProducts = availableProducts.filter((product) =>
              product.tags.some((tag) => tagsCheckboxStates[tag])
            );
            state.filteredProducts = filteredProducts;
          }
        } else {
          state.isTagFilteringApplied = false;
        }
      }
    },
  },
});

export const productsReducer = productsSlice.reducer;
export const productsActions = productsSlice.actions;

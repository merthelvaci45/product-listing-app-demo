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
  appliedBrandFilters: [],
  appliedTagFilters: [],
  sortedBy: null,
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
      /**
       * try to get all available products first. for this purpose,
       * check if any filtering is in action. if no filtering is applied yet,
       * "availableProducts" will be equal to "state.products", otherwise,
       * it will be set to "state.filteredProducts"
       */
      const availableProducts =
        !state.isBrandFilteringApplied && !state.isTagFilteringApplied ? state.products : state.filteredProducts;

      state.mugTypeProducts = availableProducts.filter((product) => product.itemType === "mug");
      state.shirtTypeProducts = availableProducts.filter((product) => product.itemType === "shirt");

      // since products per page should be limited to at most 16,
      // the following logic should be applied.
      state.productsInPage =
        itemType === "mug"
          ? state.mugTypeProducts.slice((pageNumber - 1) * 16, 16 * pageNumber)
          : state.shirtTypeProducts.slice((pageNumber - 1) * 16, 16 * pageNumber);
    },
    sortProductsBy(state, action) {
      const { selectedSortingOption } = action.payload;
      state.sortedBy = selectedSortingOption;

      // update sortingOptions state with the one currently selected, which is set to true
      state.sortingOptions = {
        ...initialSortingRadioButtonsState,
        [selectedSortingOption]: true,
      };

      const isFilteringApplied = state.isTagFilteringApplied || state.isBrandFilteringApplied; // check if any filtering is applied or not

      const availableProducts = isFilteringApplied ? [...state.filteredProducts] : [...state.products];

      let sortedProducts = [];

      // implement actual sorting logic in "switch" block
      // depending on selected sorting option
      switch (selectedSortingOption) {
        case SORT_OPTIONS_IDS.ASCENDING_PRICE:
          sortedProducts = availableProducts.sort((first, second) => first.price - second.price);
          break;

        case SORT_OPTIONS_IDS.DESCENDING_PRICE:
          sortedProducts = availableProducts.sort((first, second) => second.price - first.price);
          break;

        case SORT_OPTIONS_IDS.TO_OLDEST:
          sortedProducts = availableProducts.sort((first, second) => first.added - second.added);
          break;

        case SORT_OPTIONS_IDS.TO_NEWEST:
          sortedProducts = availableProducts.sort((first, second) => second.added - first.added);
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
      state.appliedBrandFilters = Object.keys(brandsCheckboxStates).filter(
        (checkboxState) => brandsCheckboxStates[checkboxState]
      );
      state.appliedTagFilters = Object.keys(tagsCheckboxStates).filter(
        (checkboxState) => tagsCheckboxStates[checkboxState]
      );

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
      if (brandsCheckboxStates.hasOwnProperty("Brands - All") && tagsCheckboxStates.hasOwnProperty("Tags - All")) {
        // if "Brands - All" is unseleceted, it means either user has applied filtering for Brands
        // or none of the Brands is selected
        if (!brandsCheckboxStates["Brands - All"]) {
          state.isBrandFilteringApplied = true; // then, set "isBrandFilteringApplied" state to true

          // if no filtering option for Brand is selected, then "filteredProducts" state will be []
          if (Object.values(brandsCheckboxStates).every((checkboxState) => !checkboxState)) {
            state.filteredProducts = [];
          } else {
            // else, apply proper filtering by selected Brand(s)
            let filteredProducts = [];
            // if "Tags - All" option is NOT selected, there will be 2 distinct cases. The first one is that
            // all Tags filtering checkboxes are left unselected. the second one is that one or more Tags
            // filtering option(s) is/are selected. Then, apply filtering of products logic as follows.
            if (!tagsCheckboxStates["Tags - All"]) {
              filteredProducts = [...state.products]
                .filter((product) => brandsCheckboxStates[product.manufacturer])
                .filter((product) => product.tags.some((prodTag) => tagsCheckboxStates[prodTag]));
            } else {
              // if "Tags - All" option is selected, it means no specific Tags filtering is applied.
              filteredProducts = [...state.products].filter((product) => brandsCheckboxStates[product.manufacturer]);
            }
            state.filteredProducts = filteredProducts;
          }
        } else {
          // if "Brands - All" option is selected, it means no filtering is applied for Brands
          state.isBrandFilteringApplied = false;
        }

        // if "Tags - All" is unseleceted, it means either user has applied filtering for Tags
        // or none of the Tags is selected
        if (!tagsCheckboxStates["Tags - All"]) {
          state.isTagFilteringApplied = true; // then, set "isTagFilteringApplied" state to true

          // if no filtering option for Tag is selected, then "filteredProducts" state will be []
          if (Object.values(tagsCheckboxStates).every((checkboxState) => !checkboxState)) {
            state.filteredProducts = [];
          } else {
            // else, apply proper filtering by selected Tag(s)
            let filteredProducts = [];
            // if "Brands - All" option is NOT selected, there will be 2 distinct cases. The first one is that
            // all Brands filtering checkboxes are left unselected. the second one is that one or more Brands
            // filtering option(s) is/are selected. Then, apply filtering of products logic as follows.
            if (!brandsCheckboxStates["Brands - All"]) {
              filteredProducts = [...state.products]
                .filter((product) => product.tags.some((tag) => tagsCheckboxStates[tag]))
                .filter((product) => brandsCheckboxStates[product.manufacturer]);
            } else {
              // if "Brands - All" option is selected, it means no specific Brands filtering is applied.
              filteredProducts = [...state.products].filter((product) =>
                product.tags.some((tag) => tagsCheckboxStates[tag])
              );
            }
            state.filteredProducts = filteredProducts;
          }
        } else {
          // if "Tags - All" option is selected, it means no filtering is applied for Tags
          state.isTagFilteringApplied = false;
        }
      }
    },
  },
});

export const productsReducer = productsSlice.reducer;
export const productsActions = productsSlice.actions;

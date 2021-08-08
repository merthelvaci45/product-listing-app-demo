import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [], totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const { id, productName, price } = action.payload;
      /**
       * During addition of a product to "cart", there are 2 distinct cases.
       * The first one is that a product is being added to "cart" for the 1st time.
       * In this case, create a new object with "id", "name", "price" and "quantity" properties
       * and add it to "cart" array.
       * The second one is that a product has already been added to "cart" before.
       * In this case, just increase the quantity of that product by 1.
       * In both cases, "totalPrice" property of "state" object must be definitely updated!
       */

      // CASE I: A product is being added for the first time
      if (state.cart.length === 0) {
        // if "cart" is empty, it means the product is being added for the first time
        state.cart = [...state.cart, { id, productName, price, quantity: 1 }];
      } else {
        const existingProductIndex = state.cart.findIndex(
          (product) => product.id === id
        ); // check if the product already exists in "cart"
        if (existingProductIndex < 0) {
          // it means, the product has not been added to "cart" before
          state.cart = [...state.cart, { id, productName, price, quantity: 1 }];
        } else {
          // it means, the product has already been added to "cart" before, then just increase its quantity by 1
          const existingProduct = { ...state.cart[existingProductIndex] }; // first, extract all current properties of the existing product
          existingProduct.quantity++; // increase its quantity by 1
          state.cart[existingProductIndex] = existingProduct; // update the product in "cart"
        }
      }
      // in any case, update "totalPrice" property
      state.totalPrice += price;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

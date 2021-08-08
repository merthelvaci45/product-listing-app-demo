import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [], totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const { id, name, price } = action.payload;
      /**
       * During addition of a product to "cart", there are 2 distinct cases.
       * The first one is that a product is being added to "cart" for the 1st time.
       * In this case, create a new object with "id", "name", "price" and "quantity" properties
       * and add it to "cart" array.
       * The second one is that a product has already been added to "cart" before.
       * In this case, just increase the quantity of that product by 1.
       * In both cases, "totalPrice" property of "state" object must be definitely updated!
       */

      // if "cart" is empty, it means the product is being added for the first time
      if (state.cart.length === 0) {
        state.cart = [...state.cart, { id, name, price, quantity: 1 }];
      } else {
        const existingProductIndex = state.cart.findIndex(
          (product) => product.id === id
        ); // check if the product already exists in "cart"
        if (existingProductIndex < 0) {
          // it means, the product has not been added to "cart" before, then add it for the first time
          state.cart = [...state.cart, { id, name, price, quantity: 1 }];
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
    removeItemFromCart(state, action) {
      const { id } = action.payload;
      let existingProduct;
      /**
       * During removal of a product, there are 2 distinct cases.
       * The first one is that the number of current quantity of
       * the product is greater than 1. In this case, just decrease
       * the quantity of that product by 1 and update the UI accordingly.
       * The second one is that the number of current quantity of the
       * product is exactly equal to 1. In this case, beside decreasing
       * the quantity by 1, the product name (and price) should also be
       * removed from the basket completely and UI update should occur accordingly.
       * In both cases, "totalPrice" property of "state" object must be definitely updated!
       */
      if (state.cart.length === 0) return; // if there is no item in "cart", immediately return and do nothing

      // try to find if the product, which is being removed does already exist in "cart"
      const existingProductIndex = state.cart.findIndex(
        (product) => product.id === id
      );

      if (existingProductIndex < 0) return; // it means the product is NOT in the "cart", so immediately return and do nothing

      // if the product do already in "cart", extract it first
      existingProduct = { ...state.cart[existingProductIndex] };

      // check if its quantity is greater than 1
      const productQuantity = existingProduct.quantity;
      if (productQuantity > 1) {
        // then, decrease its quantity by 1
        existingProduct.quantity--;
        state.cart[existingProductIndex] = existingProduct; // update the product in "cart"
      } else {
        // it means product.quantity = 1
        // then, remove it from "cart" completely
        state.cart = state.cart.filter((product) => product.id !== id);
      }
      // in any case, update "totalPrice" property
      state.totalPrice -= existingProduct.price;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

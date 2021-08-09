import { createSlice } from "@reduxjs/toolkit";

const initialState = { pageNumber: 1 };

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    incrementPageNumber(state) {
      state.pageNumber++;
    },
    decrementPageNumber(state) {
      state.pageNumber--;
    },
    setPageNumberTo(state, action) {
      state.pageNumber = action.payload;
    },
  },
});

export const paginationReducer = paginationSlice.reducer;
export const paginationActions = paginationSlice.actions;

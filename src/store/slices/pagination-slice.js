import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 1,
  pageNumbers: [],
  totalNumberOfPages: 0,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setTotalPageNumbers(state, action) {
      state.pageNumbers = [
        1,
        2,
        3,
        4,
        "...",
        action.payload - 3,
        action.payload - 2,
        action.payload - 1,
        action.payload,
      ];
      state.totalNumberOfPages = action.payload;
    },
    incrementPageNumber(state) {
      // if the last page is reached, do not further increment the page number and immediately return
      if (state.pageNumber > state.totalNumberOfPages - 1) return;

      state.pageNumber++; // else, increment page number as usual
      let updatedPageNumbers = [...state.pageNumbers]; // get, current "pageNumbers" collection

      /**
       * If currently active page number is greater than 4, there will be 2 distinct cases to be implemented.
       * The first case is that currently active page number does not reach to the end of pagination yet, i.e,
       * it is still smaller than (totalNumberOfPages - 4), where 4 represents total number of pages displayed
       * at the end after "..." character. In this case, just the numbers placed at the left of "..." character
       * should be incremented properly.
       * -----------------------------------------------------------------------------------------------------
       * The second case is that currently active page number DOES reach to the end of pagination, i.e, it is
       * now equal to (totalNumberOfPages - 4), where 4 represents total number of pages displayed at the end
       * after "..." character. In this case, "..." character should be removed from the pagination and 8
       * consequtive page numbers should be displayed. The number at the farthest right is the last page number,
       * and the number at the farthest left should be (lastPageNumber - 7).
       */
      if (state.pageNumber > 4) {
        if (state.pageNumber >= state.totalNumberOfPages - 4) {
          // CASE II
          updatedPageNumbers = [
            state.totalNumberOfPages - 7,
            state.totalNumberOfPages - 6,
            state.totalNumberOfPages - 5,
            state.totalNumberOfPages - 4,
            state.totalNumberOfPages - 3,
            state.totalNumberOfPages - 2,
            state.totalNumberOfPages - 1,
            state.totalNumberOfPages,
          ];
        } else {
          // CASE I
          updatedPageNumbers = [
            state.pageNumbers[0] + 1,
            state.pageNumbers[0] + 2,
            state.pageNumbers[0] + 3,
            state.pageNumbers[0] + 4,
            state.pageNumbers[4],
            state.totalNumberOfPages - 3,
            state.totalNumberOfPages - 2,
            state.totalNumberOfPages - 1,
            state.totalNumberOfPages,
          ];
        }
      }
      state.pageNumbers = updatedPageNumbers; // in either case, update "pageNumbers" state to be equal to "updatedPageNumbers"
    },
    decrementPageNumber(state) {
      // if the first page is reached, do not further decrement the page number and immediately return
      if (state.pageNumber <= 1) return;

      state.pageNumber--; // else, decrement page number as usual
      let updatedPageNumbers = [...state.pageNumbers]; // get, current "pageNumbers" collection
      /**
       * There will be 3 distinct cases which should be evaluated for decrementing page number.
       * The first one is that decrementing occurs for the page number less than 5. In this case,
       * no matter what the current page number is, the first 4 page numbers at the left of pagination
       * should be 1, 2, 3 and 4 in given order. The last 4 page numbers should be as expected.
       * --------------------------------------------------------------------------------------------
       * The second one is that decrementing occurs for the page number greater than or equal to 5.
       * In this case, two distinct sub-cases should be checked as well. The first sub-case is that
       * if the page number does not reach to the end group of pagination, which holds the last 4
       * page numbers, yet, the first 4 numbers of the previous "state.pageNumbers" should be decremented
       * by 1. The rest will be the same with that of the first case.
       * --------------------------------------------------------------------------------------------
       * The second sub-case is that if the page number DOES reach to the end group of pagination, which
       * holds the last 4 page numbers, then only the last 8 page numbers should be displayed in ascending
       * order from left to right.
       */

      if (state.pageNumber < 5) {
        updatedPageNumbers = [
          1,
          2,
          3,
          4,
          "...",
          state.totalNumberOfPages - 3,
          state.totalNumberOfPages - 2,
          state.totalNumberOfPages - 1,
          state.totalNumberOfPages,
        ];
      } else if (state.pageNumber >= 5) {
        if (state.pageNumber < state.totalNumberOfPages - 4) {
          updatedPageNumbers = [
            state.pageNumbers[0] - 1,
            state.pageNumbers[0],
            state.pageNumbers[0] + 1,
            state.pageNumbers[0] + 2,
            "...",
            state.totalNumberOfPages - 3,
            state.totalNumberOfPages - 2,
            state.totalNumberOfPages - 1,
            state.totalNumberOfPages,
          ];
        } else {
          updatedPageNumbers = [
            state.totalNumberOfPages - 7,
            state.totalNumberOfPages - 6,
            state.totalNumberOfPages - 5,
            state.totalNumberOfPages - 4,
            state.totalNumberOfPages - 3,
            state.totalNumberOfPages - 2,
            state.totalNumberOfPages - 1,
            state.totalNumberOfPages,
          ];
        }
      }
      state.pageNumbers = updatedPageNumbers;
    },
    setPageNumberTo(state, action) {
      state.pageNumber = action.payload;
    },
  },
});

export const paginationReducer = paginationSlice.reducer;
export const paginationActions = paginationSlice.actions;

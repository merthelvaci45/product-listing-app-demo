import { useEffect } from "react";
import PropTypes from "prop-types";

import classes from "./Pagination.module.scss";

import { paginationActions } from "../../store/slices";

import { FlatButton, Text } from "..";
import { useStore } from "../../hooks";

/**
 * this component constitutes the pagination section at the bottom of the page.
 * @param {Number} totalNumberOfPages: prop to check how many pages will be displayed
 */
const Pagination = ({ totalNumberOfPages }) => {
  const { dispatch, pageNumber, pageNumbers } = useStore();

  /**
   * this handler function is responsible for dispatching the action of "paginationSlice"
   * for incrementing the page number upon clicking "Next" button
   */
  const incrementPageNumberHandler = () => {
    dispatch(paginationActions.incrementPageNumber());
  };

  /**
   * this handler function is responsible for dispatching the action of "paginationSlice"
   * for decrementing the page number upon clicking "Prev" button
   */
  const decrementPageNumberHandler = () => {
    dispatch(paginationActions.decrementPageNumber());
  };

  /**
   * this handler function is responsible for dispatching the action of "paginationSlice"
   * for setting the page number to a value on which is pressed.
   * Not that the action should never be dispatched if user clicks upon "..." section, which
   * is displayed for tablet or larger screen sizes.
   */
  const setPageNumberHandler = ({ currentTarget }) => {
    const { id } = currentTarget; // in order to determine which page number is pressed, pull out "id" prop
    if (id !== "...") {
      dispatch(paginationActions.setPageNumberTo(parseInt(id, 10)));
    }
  };

  /**
   * this effect hook is responsible for setting total number of pages
   * to the specified redux state after the 1st render occurs.
   */
  useEffect(() => {
    dispatch(
      paginationActions.setTotalPageNumbers({
        totalNumberOfPages,
      })
    );
  }, [dispatch, totalNumberOfPages]);

  return (
    <div className={classes.Pagination}>
      <FlatButton onPressed={decrementPageNumberHandler}>
        <i className="fas fa-arrow-left" />
        <Text fontWeight="FontWeight600" text="Prev" />
      </FlatButton>
      <div className={classes.PageNumbers}>
        {pageNumbers.map((number) => (
          <FlatButton
            key={number}
            id={number.toString()}
            isBorderedStyle={pageNumber === number}
            isNotPrimaryColor
            onPressed={setPageNumberHandler}>
            {number}
          </FlatButton>
        ))}
      </div>
      <FlatButton onPressed={incrementPageNumberHandler}>
        <Text fontWeight="FontWeight600" text="Next" />
        <i className="fas fa-arrow-right" />
      </FlatButton>
    </div>
  );
};

Pagination.propTypes = {
  totalNumberOfPages: PropTypes.number.isRequired,
};

export default Pagination;

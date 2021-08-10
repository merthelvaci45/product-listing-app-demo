import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import classes from "./Pagination.module.scss";

import { paginationActions } from "../../store/slices";

import FlatButton from "../../components/FlatButton";
import Text from "../../components/Text";

/**
 * this component constitutes the pagination section at the bottom of the page.
 * @param {Number} totalNumberOfPages: prop to check how many pages will be displayed
 */
const Pagination = ({ totalNumberOfPages }) => {
  const dispatch = useDispatch();
  const { pageNumber, pageNumbers } = useSelector(
    (state) => state.paginationSlice
  ); // extract "pageNumber" and "pageNumbers" states of "paginationSlice"

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
    id !== "..." && dispatch(paginationActions.setPageNumberTo(parseInt(id)));
  };

  /**
   * this effect hook is responsible for setting total number of pages
   * to the specified redux state after the 1st render occurs.
   */
  useEffect(() => {
    dispatch(paginationActions.setTotalPageNumbers({ totalNumberOfPages }));
  }, [dispatch, totalNumberOfPages]);

  return (
    <div className={classes.Pagination}>
      <FlatButton onPressed={decrementPageNumberHandler}>
        <i className="fas fa-arrow-left"></i>
        <Text fontWeight="FontWeight600" text="Prev" />
      </FlatButton>
      <div className={classes.PageNumbers}>
        {pageNumbers.map((number) => {
          return (
            <FlatButton
              key={number}
              id={number.toString()}
              isBorderedStyle={pageNumber === number}
              isNotPrimaryColor
              onPressed={setPageNumberHandler}
            >
              {number}
            </FlatButton>
          );
        })}
      </div>
      <FlatButton onPressed={incrementPageNumberHandler}>
        <Text fontWeight="FontWeight600" text="Next" />
        <i className="fas fa-arrow-right"></i>
      </FlatButton>
    </div>
  );
};

Pagination.propTypes = {
  totalNumberOfPages: PropTypes.number.isRequired,
};

export default Pagination;

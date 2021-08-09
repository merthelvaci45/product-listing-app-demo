import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import classes from "./Pagination.module.scss";

import { paginationActions } from "../../store/slices";

import FlatButton from "../../components/FlatButton";
import Text from "../../components/Text";

const Pagination = ({ totalNumberOfPages }) => {
  const dispatch = useDispatch();
  const { pageNumber, pageNumbers } = useSelector(
    (state) => state.paginationSlice
  );

  const incrementPageNumberHandler = () => {
    dispatch(paginationActions.incrementPageNumber());
  };

  const decrementPageNumberHandler = () => {
    dispatch(paginationActions.decrementPageNumber());
  };

  const setPageNumberHandler = ({ currentTarget }) => {
    const { id } = currentTarget;
    id !== "..." && dispatch(paginationActions.setPageNumberTo(parseInt(id)));
  };

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
          //if (index === 4) return <span key={number}>...</span>;
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

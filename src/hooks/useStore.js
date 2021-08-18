import { useDispatch, useSelector } from "react-redux";

/**
 * this hook is responsible for serving all redux states belonging to all redux slices along
 * with "dispatch" function from one central place. by the help of this hook, there will be
 * no need to import "useSelector" and/or "useDispatch" from "react-redux" package repeatedly
 * in any component. just invoking this hook and pulling out the required states will work smoothly.
 */
const useStore = () => {
  const dispatch = useDispatch();
  const {
    products,
    filteredProducts,
    productsInPage,
    mugTypeProducts,
    shirtTypeProducts,
    sortingOptions,
    isBrandFilteringApplied,
    isTagFilteringApplied,
    appliedBrandFilters,
    appliedTagFilters,
    sortedBy,
  } = useSelector((state) => state.productsSlice);

  const { cart, totalPrice } = useSelector((state) => state.cartSlice);

  const { pageNumber, pageNumbers, totalNumberOfPages } = useSelector((state) => state.paginationSlice);

  return {
    dispatch,
    products,
    filteredProducts,
    productsInPage,
    mugTypeProducts,
    shirtTypeProducts,
    sortingOptions,
    isBrandFilteringApplied,
    isTagFilteringApplied,
    appliedBrandFilters,
    appliedTagFilters,
    sortedBy,
    cart,
    totalPrice,
    pageNumber,
    pageNumbers,
    totalNumberOfPages,
  };
};

export default useStore;

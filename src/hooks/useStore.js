import { useDispatch, useSelector } from "react-redux";

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

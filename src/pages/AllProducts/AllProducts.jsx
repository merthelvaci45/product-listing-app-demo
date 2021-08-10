import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./AllProducts.module.scss";

import {
  ItemType,
  Layout,
  Pagination,
  ProductCard,
  ShoppingCart,
  SortingAndFilteringSection,
  Spinner,
  Title,
} from "../../components";

import {
  useAPI,
  useManufacturerCountForItemType,
  useTagCountForItemType,
  useWindowDimensions,
} from "../../hooks";
import { productsActions } from "../../store/slices";
import { ITEMS_API_BASE_URL } from "../../utils";

const AllProducts = () => {
  const [itemType, setItemType] = useState("mug"); // state to keep track of products beloging to which itemType is listed
  const dispatch = useDispatch();
  const {
    filteredProducts,
    isBrandFilteringApplied,
    isTagFilteringApplied,
    products,
    productsInPage,
  } = useSelector((state) => state.productsSlice);
  const pageNumber = useSelector((state) => state.paginationSlice.pageNumber);

  const { width } = useWindowDimensions();

  const [itemsData, isItemsDataLoading] = useAPI({
    queryPath: ITEMS_API_BASE_URL,
  }); // invoke hook to fetch "items" data from dummy backend API

  const [manufacturersForMugType, manufacturersForShirtType] =
    useManufacturerCountForItemType(itemsData);

  const [tagsForMugType, tagsForShirtType] = useTagCountForItemType(itemsData);

  // the following 2 variables are passed to "SearchingAndFilteringSection" component as props
  // and they are responsible for populating "Brands" and "Tags" filtering box contents, respectively.
  const manufacturers =
    itemType === "mug" ? manufacturersForMugType : manufacturersForShirtType;

  const tags = itemType === "mug" ? tagsForMugType : tagsForShirtType;

  // this handler function is responsible for setting "itemType" state based on selected "product" type at the top
  const setItemTypeHandler = (itemType) => setItemType(itemType);

  /**
   * this hook is responsible for populating "products" state of "productsSlice" slice of redux store
   * with "itemsData", which is fetched from API
   */
  useEffect(() => {
    // dispatch this action only if data fetching did NOT occur before
    if (itemsData !== undefined && itemsData.length > 0) {
      dispatch(productsActions.fetchProducts({ products: itemsData }));
    }
  }, [itemsData, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * this hook is responsible for fetching products of specific "itemType" displayed only for the current page.
   * Note the content of the dependency array here. The purpose is to refetch products per page whenever any of
   * these states is updated, otherwise, displayed data will be stale!
   */
  useEffect(() => {
    dispatch(productsActions.fetchProductsForPage({ pageNumber, itemType }));
  }, [
    dispatch,
    filteredProducts,
    isBrandFilteringApplied,
    isTagFilteringApplied,
    itemType,
    pageNumber,
    products,
  ]);

  if (isItemsDataLoading) return <Spinner />; // while data fetching is in progress, display a loading Spinner

  return (
    <Layout>
      <div className={classes.AllProducts}>
        <SortingAndFilteringSection manufacturers={manufacturers} tags={tags} />
        <section>
          <Title title="Products" />
          <div className={classes.ItemTypes}>
            <ItemType
              isSelected={itemType === "mug"}
              itemType="mug"
              onClicked={setItemTypeHandler.bind(this, "mug")}
            />
            <ItemType
              isSelected={itemType === "shirt"}
              itemType="shirt"
              onClicked={setItemTypeHandler.bind(this, "shirt")}
            />
          </div>
          <div className={classes.ProductsList}>
            {productsInPage.length === 0 ? (
              <span>
                No available product found. Please try to remove some filtering
                options
              </span>
            ) : (
              productsInPage?.map((product) => (
                <ProductCard
                  key={product.slug}
                  id={product.slug}
                  price={product.price}
                  productName={product.name}
                />
              ))
            )}
          </div>
          {(!isBrandFilteringApplied ||
            !isTagFilteringApplied ||
            (filteredProducts.length > 0 &&
              (isBrandFilteringApplied || isTagFilteringApplied))) && (
            <div className={classes.Pagination}>
              <Pagination
                totalNumberOfPages={Math.ceil(
                  isBrandFilteringApplied || isTagFilteringApplied
                    ? filteredProducts?.length / 32
                    : products?.length / 32
                )}
              />
            </div>
          )}
        </section>
        {width >= 1200 && <ShoppingCart />}
      </div>
    </Layout>
  );
};

export default AllProducts;

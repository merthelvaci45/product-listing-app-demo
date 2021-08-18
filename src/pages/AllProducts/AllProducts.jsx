import { useEffect, useMemo, useState } from "react";

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
  useStore,
  useTagCountForItemType,
  useWindowDimensions,
} from "../../hooks";
import { productsActions } from "../../store/slices";
import { ITEMS_API_BASE_URL } from "../../utils";

const AllProducts = () => {
  const [itemType, setItemType] = useState("mug"); // state to keep track of products beloging to which itemType is listed
  const {
    dispatch,
    filteredProducts,
    isBrandFilteringApplied,
    isTagFilteringApplied,
    mugTypeProducts,
    products,
    productsInPage,
    shirtTypeProducts,
    pageNumber,
  } = useStore();

  const { width } = useWindowDimensions();

  const [itemsData, isItemsDataLoading] = useAPI({
    queryPath: ITEMS_API_BASE_URL,
  }); // invoke hook to fetch "items" data from dummy backend API

  const [manufacturersForMugType, manufacturersForShirtType] = useManufacturerCountForItemType(itemsData);

  const [tagsForMugType, tagsForShirtType] = useTagCountForItemType(itemsData);

  /**
   * "totalNumberOfPages" to be displayed in Pagination section at the bottom is calculated conditionally.
   * The first case is that, there is no applied filtering neither for brands nor for tags. In this case,
   * the calculation will be perfomed as in the first "if" statement.
   * ----------------------------------------------------------------------------------------------------
   * The second case is that if any filtering is applied and currently selected itemType is "mug", then the
   * calculation will be perfomed as in the second "if" statement. The reason why it is divided by 16 and not
   * by e.g., 32 is that for each item type, at most 16 products will be displayed in each page.
   * ----------------------------------------------------------------------------------------------------
   * The third case is that if any filtering is applied and currently selected itemType is "shirt", then the
   * calculation will be perfomed as in the third "if" statement. The reason why it is divided by 16 and not
   * by e.g., 32 is that for each item type, at most 16 products will be displayed in each page.
   * If none of the 3 conditions is satisfied, return 0.
   */
  const totalNumberOfPages = useMemo(() => {
    if (!isBrandFilteringApplied && !isTagFilteringApplied) return Math.ceil(products.length / 32);
    if (itemType === "mug") return Math.ceil(mugTypeProducts.length / 16);
    if (itemType === "shirt") return Math.ceil(shirtTypeProducts.length / 16);
    return 0;
  }, [
    isBrandFilteringApplied,
    isTagFilteringApplied,
    itemType,
    mugTypeProducts.length,
    products.length,
    shirtTypeProducts.length,
  ]);

  // the following 2 variables are passed to "SearchingAndFilteringSection" component as props
  // and they are responsible for populating "Brands" and "Tags" filtering box contents, respectively.
  const manufacturers = itemType === "mug" ? manufacturersForMugType : manufacturersForShirtType;

  const tags = itemType === "mug" ? tagsForMugType : tagsForShirtType;

  // this handler function is responsible for setting "itemType" state based on selected "product" type at the top
  const setItemTypeHandler = (itemType) => setItemType(itemType);

  /**
   * this hook is responsible for populating "products" state of "productsSlice" slice of redux store
   * with "itemsData", which is fetched from API
   */
  useEffect(() => {
    // dispatch this action only if data fetching did NOT occur before
    if (itemsData?.length > 0) {
      dispatch(
        productsActions.fetchProducts({
          products: itemsData,
        })
      );
    }
  }, [itemsData?.length, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * this hook is responsible for fetching products of specific "itemType" displayed only for the current page.
   * Note the content of the dependency array here. The purpose is to refetch products per page whenever any of
   * these states is updated, otherwise, displayed data will be stale!
   */
  useEffect(() => {
    dispatch(
      productsActions.fetchProductsForPage({
        pageNumber,
        itemType,
      })
    );
  }, [dispatch, filteredProducts, isBrandFilteringApplied, isTagFilteringApplied, itemType, pageNumber, products]);

  if (isItemsDataLoading) {
    // while data fetching is in progress or "products" state is not updated with "itemsData" yet, display a loading Spinner
    return <Spinner />;
  }

  return (
    <Layout>
      <div className={classes.AllProducts}>
        <SortingAndFilteringSection itemType={itemType} manufacturers={manufacturers} tags={tags} />
        <section>
          <Title title="Products" />
          <div className={classes.ItemTypes}>
            <ItemType isSelected={itemType === "mug"} itemType="mug" onClicked={setItemTypeHandler.bind(this, "mug")} />
            <ItemType
              isSelected={itemType === "shirt"}
              itemType="shirt"
              onClicked={setItemTypeHandler.bind(this, "shirt")}
            />
          </div>
          <div className={classes.ProductsList}>
            {productsInPage.length === 0 ? (
              <span>No available product found. Please try to remove some filtering options</span>
            ) : (
              productsInPage?.map((product) => (
                <ProductCard key={product.slug} id={product.slug} price={product.price} productName={product.name} />
              ))
            )}
          </div>
          <div className={classes.Pagination}>
            <Pagination totalNumberOfPages={totalNumberOfPages} />
          </div>
        </section>
        {width >= 1200 && <ShoppingCart />}
      </div>
    </Layout>
  );
};

export default AllProducts;

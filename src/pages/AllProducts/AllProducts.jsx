import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./AllProducts.module.scss";

import ItemType from "../../components/ItemType";
import Layout from "../../components/Layout";
import Basket from "../../components/Basket";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import SortingAndFilteringSection from "../../components/SortingAndFilteringSection";
import Spinner from "../../components/Spinner";
import Title from "../../components/Title";

import {
  useAPI,
  useManufacturerCountForItemType,
  useTagCountForItemType,
} from "../../hooks";
import { productsActions } from "../../store/slices";
import { ITEMS_API_BASE_URL } from "../../utils";

const AllProducts = () => {
  const [itemType, setItemType] = useState("mug");
  const dispatch = useDispatch();
  const { products, productsInPage } = useSelector(
    (state) => state.productsSlice
  );
  const pageNumber = useSelector((state) => state.paginationSlice.pageNumber);

  const [itemsData, isItemsDataLoading] = useAPI({
    queryPath: ITEMS_API_BASE_URL,
  });

  const manufacturersForMugType = useManufacturerCountForItemType(
    itemsData,
    "mug"
  );
  const manufacturersForShirtType = useManufacturerCountForItemType(
    itemsData,
    "shirt"
  );

  const tagsForMugType = useTagCountForItemType(itemsData, "mug");
  const tagsForShirtType = useTagCountForItemType(itemsData, "shirt");

  const manufacturers =
    itemType === "mug" ? manufacturersForMugType : manufacturersForShirtType;
  const tags = itemType === "mug" ? tagsForMugType : tagsForShirtType;

  const setItemTypeHandler = (itemType) => setItemType(itemType);

  useEffect(() => {
    if (itemsData !== undefined && itemsData.length > 0) {
      dispatch(productsActions.fetchProducts({ products: itemsData }));
    }
  }, [itemsData, dispatch]);

  useEffect(() => {
    dispatch(productsActions.fetchProductsForPage({ pageNumber, itemType }));
  }, [dispatch, itemType, pageNumber, products]);

  return isItemsDataLoading ? (
    <Spinner />
  ) : (
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
            {productsInPage?.map((product) => (
              <ProductCard
                key={product.slug}
                id={product.slug}
                price={product.price}
                productName={product.name}
              />
            ))}
          </div>
          <div className={classes.Pagination}>
            <Pagination
              totalNumberOfPages={Math.ceil(itemsData?.length / 32)}
            />
          </div>
        </section>
        <Basket />
      </div>
    </Layout>
  );
};

export default AllProducts;

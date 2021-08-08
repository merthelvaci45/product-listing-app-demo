import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./AllProducts.module.scss";

import Checkbox from "../../components/Checkbox";
import FeatureCardWithTitle from "../../components/FeatureCardWithTitle";
import Input from "../../components/Input";
import ItemType from "../../components/ItemType";
import Layout from "../../components/Layout";
import Basket from "../../components/Basket";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import RadioButton from "../../components/RadioButton";
import Spinner from "../../components/Spinner";
import Title from "../../components/Title";

import {
  useAPI,
  useManufacturerCountForItemType,
  useTagCountForItemType,
} from "../../hooks";

import { productsActions } from "../../store/slices";

import { ITEMS_API_BASE_URL, SORT_OPTIONS } from "../../utils";

const AllProducts = () => {
  const [itemType, setItemType] = useState("mug");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cart);

  const [itemsData, isItemsDataLoading] = useAPI({
    queryPath: ITEMS_API_BASE_URL,
  });

  console.log("cart: ", cart);

  useEffect(() => {
    if (itemsData !== undefined && itemsData.length > 0) {
      dispatch(productsActions.populateProducts({ products: itemsData }));
    }
  }, [itemsData, dispatch]);

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

  const setItemTypeHandler = (itemType) => setItemType(itemType);

  const manufacturers =
    itemType === "mug" ? manufacturersForMugType : manufacturersForShirtType;
  const tags = itemType === "mug" ? tagsForMugType : tagsForShirtType;

  return isItemsDataLoading ? (
    <Spinner />
  ) : (
    <Layout>
      <div className={classes.AllProducts}>
        <section className={classes.LeftSection}>
          <FeatureCardWithTitle isFixedHeight title="Sorting">
            {SORT_OPTIONS.map((option, index) => (
              <RadioButton
                key={option.id}
                id={option.id}
                isChecked={index === 0}
                label={option.label}
                onChanged={() => {}}
              />
            ))}
          </FeatureCardWithTitle>
          <FeatureCardWithTitle title="Brands">
            <Input
              id="brand"
              onChanged={() => {}}
              placeholder="Search brand"
              value=""
            />
            {Object.keys(manufacturers).map((manufacturer) => (
              <Checkbox
                key={manufacturer}
                id={manufacturer}
                isChecked={false}
                label={manufacturer}
                quantity={manufacturers[manufacturer]}
                onChanged={() => {}}
              />
            ))}
          </FeatureCardWithTitle>
          <FeatureCardWithTitle title="Tags">
            <Input
              id="tag"
              onChanged={() => {}}
              placeholder="Search tag"
              value=""
            />
            {Object.keys(tags).map((tag) => (
              <Checkbox
                key={tag}
                id={tag}
                isChecked={false}
                label={tag}
                quantity={tags[tag]}
                onChanged={() => {}}
              />
            ))}
          </FeatureCardWithTitle>
        </section>
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
            {itemsData
              ?.filter((item) => item.itemType === itemType)
              .map((product, index) => {
                if (index < 16) {
                  return (
                    <ProductCard
                      key={product.slug}
                      id={product.slug}
                      price={product.price}
                      productName={product.name}
                    />
                  );
                }

                return null;
              })}
          </div>
          <div className={classes.Pagination}>
            <Pagination />
          </div>
        </section>
        <section className={classes.RightSection}>
          <Basket />
        </section>
      </div>
    </Layout>
  );
};

export default AllProducts;

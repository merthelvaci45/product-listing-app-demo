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
import Title from "../../components/Title";

import { SORT_OPTIONS } from "../../utils";

const indices = Array.from({ length: 16 }, (_, i) => i + 1);
const checkboxes = Array.from({ length: 12 }, (_, i) => i + 1);

const AllProducts = () => {
  return (
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
            <Input onChanged={() => {}} placeholder="Search brand" value="" />
            {checkboxes.map((i) => (
              <Checkbox
                id="first"
                //isChecked={isChecked}
                label="All"
                quantity={18}
                //onChanged={checkHandler}
              />
            ))}
          </FeatureCardWithTitle>
          <FeatureCardWithTitle title="Tags">
            <Input onChanged={() => {}} placeholder="Search tag" value="" />
            {checkboxes.map((i) => (
              <Checkbox
                id="first"
                //isChecked={isChecked}
                label="All"
                quantity={18}
                //onChanged={checkHandler}
              />
            ))}
          </FeatureCardWithTitle>
        </section>
        <section>
          <Title title="Products" />
          <div className={classes.ItemTypes}>
            <ItemType itemType="mug" />
            <ItemType isContrasted itemType="shirt" />
          </div>
          <div className={classes.ProductsList}>
            {indices.map((i) => (
              <ProductCard
                key={i}
                price={14.99}
                productName="Rustic Beach Mug"
              />
            ))}
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

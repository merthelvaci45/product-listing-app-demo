import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import classes from "./SortingAndFilteringSection.module.scss";

import Checkbox from "../Checkbox";
import FeatureCardWithTitle from "../FeatureCardWithTitle";
import Input from "../Input";
import RadioButton from "../RadioButton";

import { productsActions } from "../../store/slices";
import { SORT_OPTIONS } from "../../utils";

const SortingAndFilteringSection = ({ manufacturers, tags }) => {
  const dispatch = useDispatch();
  const sortingOptions = useSelector(
    (state) => state.productsSlice.sortingOptions
  );

  const sortProductsByOptionHandler = (optionId) => {
    dispatch(
      productsActions.sortProductsBy({ selectedSortingOption: optionId })
    );
  };

  return (
    <section className={classes.LeftSection}>
      <FeatureCardWithTitle isFixedHeight title="Sorting">
        {SORT_OPTIONS.map((option) => (
          <RadioButton
            key={option.id}
            id={option.id}
            isChecked={sortingOptions[option.id]}
            label={option.label}
            onChanged={sortProductsByOptionHandler.bind(this, option.id)}
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
  );
};

SortingAndFilteringSection.propTypes = {
  manufacturers: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
};

export default SortingAndFilteringSection;

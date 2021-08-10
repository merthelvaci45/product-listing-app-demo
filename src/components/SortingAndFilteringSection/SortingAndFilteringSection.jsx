import { useEffect, useState } from "react";
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
  const [brandFilteringText, setBrandFilteringText] = useState("");
  const [tagFilteringText, setTagFilteringText] = useState("");
  const [brandsCheckboxStates, setBrandsCheckboxStates] = useState({});
  const [tagsCheckboxStates, setTagsCheckboxStates] = useState({});
  const dispatch = useDispatch();
  const sortingOptions = useSelector(
    (state) => state.productsSlice.sortingOptions
  );

  const setFilteringTextHandler = ({ currentTarget }) => {
    const { id, value } = currentTarget;
    if (id === "brand") return setBrandFilteringText(value);
    return setTagFilteringText(value);
  };

  const sortProductsByOptionHandler = (optionId) => {
    dispatch(
      productsActions.sortProductsBy({ selectedSortingOption: optionId })
    );
  };

  const toggleBrandsFilteringCheckboxStatesHandler = (brand) => {
    setBrandsCheckboxStates((prevState) => {
      if (brand === "Brands - All" && !prevState["Brands - All"]) {
        return Object.keys(prevState).reduce(
          (checkboxStates, brand) => ({
            ...checkboxStates,
            [brand]: brand === "Brands - All",
          }),
          {}
        );
      }

      return {
        ...prevState,
        "Brands - All": false,
        [brand]: !prevState[brand],
      };
    });
  };

  const toggleTagsFilteringCheckboxStatesHandler = (tag) => {
    setTagsCheckboxStates((prevState) => {
      if (tag === "Tags - All" && !prevState["Tags - All"]) {
        return Object.keys(prevState).reduce(
          (checkboxStates, tag) => ({
            ...checkboxStates,
            [tag]: tag === "Tags - All",
          }),
          {}
        );
      }

      return {
        ...prevState,
        "Tags - All": false,
        [tag]: !prevState[tag],
      };
    });
  };

  useEffect(() => {
    setBrandsCheckboxStates(() => {
      return Object.keys(manufacturers).reduce(
        (checkboxStates, brand) => ({
          ...checkboxStates,
          [brand]: brand === "Brands - All",
        }),
        {}
      );
    });
  }, [manufacturers]);

  useEffect(() => {
    setTagsCheckboxStates(() => {
      return Object.keys(tags).reduce(
        (checkboxStates, tag) => ({
          ...checkboxStates,
          [tag]: tag === "Tags - All",
        }),
        {}
      );
    });
  }, [tags]);

  useEffect(() => {
    dispatch(
      productsActions.filterProductsBy({
        brandsCheckboxStates,
        tagsCheckboxStates,
      })
    );
  }, [brandsCheckboxStates, dispatch, tagsCheckboxStates]);

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
          onChanged={setFilteringTextHandler}
          placeholder="Search brand"
          value={brandFilteringText}
        />
        {Object.keys(manufacturers)
          .filter((manufacturer) =>
            manufacturer
              .toLowerCase()
              .includes(brandFilteringText.toLowerCase())
          )
          .map((manufacturer) => (
            <Checkbox
              key={manufacturer}
              id={manufacturer}
              isChecked={brandsCheckboxStates[manufacturer]}
              label={manufacturer}
              quantity={manufacturers[manufacturer]}
              onChanged={toggleBrandsFilteringCheckboxStatesHandler.bind(
                this,
                manufacturer
              )}
            />
          ))}
      </FeatureCardWithTitle>
      <FeatureCardWithTitle title="Tags">
        <Input
          id="tag"
          onChanged={setFilteringTextHandler}
          placeholder="Search tag"
          value={tagFilteringText}
        />
        {Object.keys(tags)
          .filter((tag) =>
            tag.toLowerCase().includes(tagFilteringText.toLowerCase())
          )
          .map((tag) => (
            <Checkbox
              key={tag}
              id={tag}
              isChecked={tagsCheckboxStates[tag]}
              label={tag}
              quantity={tags[tag]}
              onChanged={toggleTagsFilteringCheckboxStatesHandler.bind(
                this,
                tag
              )}
            />
          ))}
      </FeatureCardWithTitle>
    </section>
  );
};

SortingAndFilteringSection.propTypes = {
  manufacturers: PropTypes.object,
  tags: PropTypes.object,
};

SortingAndFilteringSection.defaultProps = {
  manufacturers: null,
  tags: null,
};

export default SortingAndFilteringSection;

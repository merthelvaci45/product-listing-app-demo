import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import classes from "./SortingAndFilteringSection.module.scss";

import Checkbox from "../Checkbox";
import FeatureCardWithTitle from "../FeatureCardWithTitle";
import FlatButton from "../FlatButton";
import Input from "../Input";
import Modal from "../Modal";
import RadioButton from "../RadioButton";

import { useWindowDimensions } from "../../hooks";
import { productsActions } from "../../store/slices";
import { SORT_OPTIONS } from "../../utils";

const SortingAndFilteringSection = ({ manufacturers, tags }) => {
  const [brandFilteringText, setBrandFilteringText] = useState("");
  const [tagFilteringText, setTagFilteringText] = useState("");
  const [brandsCheckboxStates, setBrandsCheckboxStates] = useState({});
  const [tagsCheckboxStates, setTagsCheckboxStates] = useState({});

  const [isSortingBoxDisplayedForMobile, setIsSortingBoxDisplayedForMobile] =
    useState(false);
  const [
    isBrandsFilteringBoxDisplayedForMobile,
    setIsBrandsFilteringBoxDisplayedForMobile,
  ] = useState(false);
  const [
    isTagsFilteringBoxDisplayedForMobile,
    setIsTagsFilteringBoxDisplayedForMobile,
  ] = useState(false);

  const { width } = useWindowDimensions();

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

  const toggleSortingBoxDisplayForMobileHandler = () =>
    setIsSortingBoxDisplayedForMobile((prevState) => !prevState);
  const toggleBrandsFilteringBoxDisplayForMobileHandler = () =>
    setIsBrandsFilteringBoxDisplayedForMobile((prevState) => !prevState);
  const toggleTagsFilteringBoxDisplayForMobileHandler = () =>
    setIsTagsFilteringBoxDisplayedForMobile((prevState) => !prevState);

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

  const sortingBoxContent = (
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
  );

  const brandsFilteringBoxContent = (
    <FeatureCardWithTitle title="Brands">
      <Input
        id="brand"
        onChanged={setFilteringTextHandler}
        placeholder="Search brand"
        value={brandFilteringText}
      />
      {Object.keys(manufacturers)
        .filter((manufacturer) =>
          manufacturer.toLowerCase().includes(brandFilteringText.toLowerCase())
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
  );

  const tagsFilteringBoxContent = (
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
            onChanged={toggleTagsFilteringCheckboxStatesHandler.bind(this, tag)}
          />
        ))}
    </FeatureCardWithTitle>
  );

  return (
    <section className={classes.LeftSection}>
      <div className={classes.ActionButtonsGroup}>
        <FlatButton onPressed={toggleSortingBoxDisplayForMobileHandler}>
          <i className="fas fa-filter" />
          <span>Sorting</span>
        </FlatButton>
        <FlatButton onPressed={toggleBrandsFilteringBoxDisplayForMobileHandler}>
          <i className="fas fa-sort" />
          <span>Filtering (Brands)</span>
        </FlatButton>
        <FlatButton onPressed={toggleTagsFilteringBoxDisplayForMobileHandler}>
          <i className="fas fa-sort" />
          <span>Filtering (Tags)</span>
        </FlatButton>
      </div>

      {width < 1200 ? (
        <Modal
          isModalOpen={isSortingBoxDisplayedForMobile}
          onDismissModal={toggleSortingBoxDisplayForMobileHandler}
        >
          {sortingBoxContent}
          <FlatButton onPressed={toggleSortingBoxDisplayForMobileHandler}>
            <i className="fas fa-times" />
            <span style={{ marginLeft: ".25rem" }}>Close</span>
          </FlatButton>
        </Modal>
      ) : (
        sortingBoxContent
      )}

      {width < 1200 ? (
        <Modal
          isModalOpen={isBrandsFilteringBoxDisplayedForMobile}
          onDismissModal={toggleBrandsFilteringBoxDisplayForMobileHandler}
        >
          {brandsFilteringBoxContent}
          <FlatButton
            onPressed={toggleBrandsFilteringBoxDisplayForMobileHandler}
          >
            <i className="fas fa-times" />
            <span style={{ marginLeft: ".25rem" }}>Close</span>
          </FlatButton>
        </Modal>
      ) : (
        brandsFilteringBoxContent
      )}

      {width < 1200 ? (
        <Modal
          isModalOpen={isTagsFilteringBoxDisplayedForMobile}
          onDismissModal={toggleTagsFilteringBoxDisplayForMobileHandler}
        >
          {tagsFilteringBoxContent}
          <FlatButton onPressed={toggleTagsFilteringBoxDisplayForMobileHandler}>
            <i className="fas fa-times" />
            <span style={{ marginLeft: ".25rem" }}>Close</span>
          </FlatButton>
        </Modal>
      ) : (
        tagsFilteringBoxContent
      )}
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

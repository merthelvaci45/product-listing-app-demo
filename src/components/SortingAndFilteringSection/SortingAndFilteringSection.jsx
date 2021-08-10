import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import classes from "./SortingAndFilteringSection.module.scss";

import {
  Checkbox,
  FeatureCardWithTitle,
  FlatButton,
  Input,
  Modal,
  RadioButton,
} from "..";

import { useWindowDimensions } from "../../hooks";
import { productsActions } from "../../store/slices";
import { SORT_OPTIONS } from "../../utils";

const SortingAndFilteringSection = ({ manufacturers, tags }) => {
  const [brandFilteringText, setBrandFilteringText] = useState("");
  const [tagFilteringText, setTagFilteringText] = useState("");
  const [brandsCheckboxStates, setBrandsCheckboxStates] = useState({});
  const [tagsCheckboxStates, setTagsCheckboxStates] = useState({});

  // the following 3 states will be in action only for screen sizes < 1200px
  const [isSortingBoxDisplayed, setIsSortingBoxDisplayed] = useState(false);

  const [isBrandsFilteringBoxDisplayed, setIsBrandsFilteringBoxDisplayed] =
    useState(false);

  const [isTagsFilteringBoxDisplayed, setIsTagsFilteringBoxDisplayed] =
    useState(false);

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const sortingOptions = useSelector(
    (state) => state.productsSlice.sortingOptions
  );

  /**
   * this handler function is responsible for updating filtering text field
   * depending on which input field is currently being updated. In order to
   * determine which input field is being updated, "id" prop is pulled out
   * from "currentTarget" object, which is provided by browser.
   */
  const setFilteringTextHandler = ({ currentTarget }) => {
    const { id, value } = currentTarget;
    if (id === "brand") return setBrandFilteringText(value);
    return setTagFilteringText(value);
  };

  /**
   * this handler function is responsible for dispatching action for performing
   * sort operation for products.
   */
  const sortProductsByOptionHandler = (optionId) => {
    dispatch(
      productsActions.sortProductsBy({ selectedSortingOption: optionId })
    );
  };

  /**
   * this handler function is responsible for changing checkbox states
   * for Brands filtering of products.
   * There will be 2 distinct cases to be applied while updating checkbox states.
   * ----------------------------------------------------------------------------
   * The first one is that if "Brands - All" checkbox is currently deselected and
   * it is desired to be checked, then all checkbox states apart from "Brands - All"
   * checkbox should be updated to be false.
   * ----------------------------------------------------------------------------
   * The second one is that if "Brands - All" checkbox is currently selected and
   * another checkbox is desired to be checked, "Brands - All" checkbox should be
   * updated to be false.
   */
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

  /**
   * this handler function is responsible for changing checkbox states
   * for Tags filtering of products.
   * There will be 2 distinct cases to be applied while updating checkbox states.
   * ----------------------------------------------------------------------------
   * The first one is that if "Tags - All" checkbox is currently deselected and
   * it is desired to be checked, then all checkbox states apart from "Tags - All"
   * checkbox should be updated to be false.
   * ----------------------------------------------------------------------------
   * The second one is that if "Tags - All" checkbox is currently selected and
   * another checkbox is desired to be checked, "Tags - All" checkbox should be
   * updated to be false.
   */
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

  // this handler function is responsible for toggling display status of "sorting" modal for small screen size devices
  const toggleSortingBoxDisplayHandler = () =>
    setIsSortingBoxDisplayed((prevState) => !prevState);

  // this handler function is responsible for toggling display status of "brands filtering" modal for small screen size devices
  const toggleBrandsFilteringBoxDisplayHandler = () =>
    setIsBrandsFilteringBoxDisplayed((prevState) => !prevState);

  // this handler function is responsible for toggling display status of "tags filtering" modal for small screen size devices
  const toggleTagsFilteringBoxDisplayHandler = () =>
    setIsTagsFilteringBoxDisplayed((prevState) => !prevState);

  /**
   * this effect hook is responsible for setting all brands filtering checkbox states
   * to false except for "Brands - All" checkbox state for the 1st render. Checking
   * "Brands - All" checkbox state to true is required so that at the initial display
   * of the screen, the user should know that there is no filtering applied based on
   * Brands all available products are displayed.
   */
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
  }, [manufacturers.length]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * this effect hook is responsible for setting all tags filtering checkbox states
   * to false except for "Tags - All" checkbox state for the 1st render. Checking
   * "Tags - All" checkbox state to true is required so that at the initial display
   * of the screen, the user should know that there is no filtering applied based on
   * Tags all available products are displayed.
   */
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
  }, [tags.length]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * this hook is responsible for triggering product filtering action
   * whenever "brandsCheckboxStates" and/or "tagsCheckboxStates" objects
   * are updated. Note that "brandsCheckboxStates" and "tagsCheckboxStates"
   * objects hold all the current checkbox states for Brands and Tags filtering
   */
  useEffect(() => {
    dispatch(
      productsActions.filterProductsBy({
        brandsCheckboxStates,
        tagsCheckboxStates,
      })
    );
  }, [brandsCheckboxStates, dispatch, tagsCheckboxStates]);

  /**
   * this effect hook is responsible for performing sort operation on
   * currently available products after each time filtering is applied
   */
  /* useEffect(() => {
    dispatch(
      productsActions.sortProductsBy({ selectedSortingOption: sortedBy })
    );
  }, [brandsCheckboxStates, dispatch, tagsCheckboxStates, sortedBy]); */

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
      {/*******************************************************
       * Displayed only for devices with screen sizes < 1200px
       ********************************************************/}
      <div className={classes.ActionButtonsGroup}>
        <FlatButton onPressed={toggleSortingBoxDisplayHandler}>
          <i className="fas fa-filter" />
          <span>Sorting</span>
        </FlatButton>
        <FlatButton onPressed={toggleBrandsFilteringBoxDisplayHandler}>
          <i className="fas fa-sort" />
          <span>Filtering (Brands)</span>
        </FlatButton>
        <FlatButton onPressed={toggleTagsFilteringBoxDisplayHandler}>
          <i className="fas fa-sort" />
          <span>Filtering (Tags)</span>
        </FlatButton>
      </div>

      {width < 1200 ? (
        <Modal
          isModalOpen={isSortingBoxDisplayed}
          onDismissModal={toggleSortingBoxDisplayHandler}
        >
          {sortingBoxContent}
          <FlatButton onPressed={toggleSortingBoxDisplayHandler}>
            <i className="fas fa-times" />
            <span style={{ marginLeft: ".25rem" }}>Close</span>
          </FlatButton>
        </Modal>
      ) : (
        sortingBoxContent
      )}

      {width < 1200 ? (
        <Modal
          isModalOpen={isBrandsFilteringBoxDisplayed}
          onDismissModal={toggleBrandsFilteringBoxDisplayHandler}
        >
          {brandsFilteringBoxContent}
          <FlatButton onPressed={toggleBrandsFilteringBoxDisplayHandler}>
            <i className="fas fa-times" />
            <span style={{ marginLeft: ".25rem" }}>Close</span>
          </FlatButton>
        </Modal>
      ) : (
        brandsFilteringBoxContent
      )}

      {width < 1200 ? (
        <Modal
          isModalOpen={isTagsFilteringBoxDisplayed}
          onDismissModal={toggleTagsFilteringBoxDisplayHandler}
        >
          {tagsFilteringBoxContent}
          <FlatButton onPressed={toggleTagsFilteringBoxDisplayHandler}>
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

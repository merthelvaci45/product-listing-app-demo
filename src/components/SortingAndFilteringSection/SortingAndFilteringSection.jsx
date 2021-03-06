import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./SortingAndFilteringSection.module.scss";

import { Checkbox, FeatureCardWithTitle, FlatButton, Input, Modal, RadioButton } from "..";

import { useStore, useWindowDimensions } from "../../hooks";
import { paginationActions, productsActions } from "../../store/slices";
import { SORT_OPTIONS } from "../../utils";

const SortingAndFilteringSection = ({ itemType, manufacturers, tags }) => {
  const [brandFilteringText, setBrandFilteringText] = useState("");
  const [tagFilteringText, setTagFilteringText] = useState("");
  const [brandsCheckboxStates, setBrandsCheckboxStates] = useState({});
  const [tagsCheckboxStates, setTagsCheckboxStates] = useState({});

  // the following 3 states will be in action only for screen sizes < 1200px
  const [isSortingBoxDisplayed, setIsSortingBoxDisplayed] = useState(false);
  const [isBrandsFilteringBoxDisplayed, setIsBrandsFilteringBoxDisplayed] = useState(false);
  const [isTagsFilteringBoxDisplayed, setIsTagsFilteringBoxDisplayed] = useState(false);

  const { width } = useWindowDimensions();

  const {
    dispatch,
    filteredProducts,
    isBrandFilteringApplied,
    isTagFilteringApplied,
    pageNumber,
    sortedBy,
    sortingOptions,
  } = useStore();

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
      productsActions.sortProductsBy({
        selectedSortingOption: optionId,
      })
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
  const toggleSortingBoxDisplayHandler = () => setIsSortingBoxDisplayed((prevState) => !prevState);

  // this handler function is responsible for toggling display status of "brands filtering" modal for small screen size devices
  const toggleBrandsFilteringBoxDisplayHandler = () => setIsBrandsFilteringBoxDisplayed((prevState) => !prevState);

  // this handler function is responsible for toggling display status of "tags filtering" modal for small screen size devices
  const toggleTagsFilteringBoxDisplayHandler = () => setIsTagsFilteringBoxDisplayed((prevState) => !prevState);

  /**
   * this effect hook is responsible for setting all brands filtering checkbox states
   * to false except for "Brands - All" checkbox state for the 1st render. Checking
   * "Brands - All" checkbox state to true is required so that at the initial display
   * of the screen, the user should know that there is no filtering applied based on
   * Brands and all available products are displayed.
   */
  useEffect(() => {
    setBrandsCheckboxStates(() =>
      Object.keys(manufacturers).reduce(
        (checkboxStates, brand) => ({
          ...checkboxStates,
          [brand]: brand === "Brands - All",
        }),
        {}
      )
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * this effect hook is responsible for setting all tags filtering checkbox states
   * to false except for "Tags - All" checkbox state for the 1st render. Checking
   * "Tags - All" checkbox state to true is required so that at the initial display
   * of the screen, the user should know that there is no filtering applied based on
   * Tags and all available products are displayed.
   */
  useEffect(() => {
    setTagsCheckboxStates(() =>
      Object.keys(tags).reduce(
        (checkboxStates, tag) => ({
          ...checkboxStates,
          [tag]: tag === "Tags - All",
        }),
        {}
      )
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
   * this effect hook is responsible for keeping products in sorted order by given sorting option
   * even when filtering by either Brands and/or Tags is applied. Note that "filteredProducts.length"
   * is given as a dependency in dependency array. The reason for this is that this effect hook is
   * desired to be re-run on every change in total length of "filteredPRoducts" state.
   */
  useEffect(() => {
    // run this hook only if a sorting option is specified by user
    if (sortedBy) {
      dispatch(
        productsActions.sortProductsBy({
          selectedSortingOption: sortedBy,
        })
      );
    }
  }, [dispatch, filteredProducts.length, sortedBy]);

  /**
   * this effect hook is responsible for setting pageNumber to 1, if any kind of (or both) filtering is(are) applied
   * and the page number just before filtering the products is greater than total number of pages just after filtering
   * the products. For example, before no filtering is applied, user is viewing page number 45. After filtering is in
   * action, let's assume that total number of pages drops to 3. Since there is no chance to display page number 45 in
   * this case, the page number will be set to 1.
   */
  useEffect(() => {
    const amountOfFilteredItemTypeProducts = filteredProducts.filter((product) => product.itemType === itemType).length;

    if (
      (isBrandFilteringApplied || isTagFilteringApplied) &&
      pageNumber > Math.ceil(amountOfFilteredItemTypeProducts / 16)
    ) {
      dispatch(paginationActions.setPageNumberTo(1));
    }
  }, [dispatch, filteredProducts, isBrandFilteringApplied, isTagFilteringApplied, itemType, pageNumber]);

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
      <Input id="brand" onChanged={setFilteringTextHandler} placeholder="Search brand" value={brandFilteringText} />
      {Object.keys(manufacturers)
        .filter((manufacturer) => manufacturer.toLowerCase().includes(brandFilteringText.toLowerCase()))
        .map((manufacturer) => (
          <Checkbox
            key={manufacturer}
            id={manufacturer}
            isChecked={brandsCheckboxStates[manufacturer]}
            label={manufacturer}
            quantity={manufacturers[manufacturer]}
            onChanged={toggleBrandsFilteringCheckboxStatesHandler.bind(this, manufacturer)}
          />
        ))}
    </FeatureCardWithTitle>
  );

  const tagsFilteringBoxContent = (
    <FeatureCardWithTitle title="Tags">
      <Input id="tag" onChanged={setFilteringTextHandler} placeholder="Search tag" value={tagFilteringText} />
      {Object.keys(tags)
        .filter((tag) => tag.toLowerCase().includes(tagFilteringText.toLowerCase()))
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
      {/** *****************************************************
       * Displayed only for devices with screen sizes < 1200px
       ******************************************************* */}
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
        <Modal isModalOpen={isSortingBoxDisplayed} onDismissModal={toggleSortingBoxDisplayHandler}>
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
        <Modal isModalOpen={isBrandsFilteringBoxDisplayed} onDismissModal={toggleBrandsFilteringBoxDisplayHandler}>
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
        <Modal isModalOpen={isTagsFilteringBoxDisplayed} onDismissModal={toggleTagsFilteringBoxDisplayHandler}>
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
  itemType: PropTypes.string,
  manufacturers: PropTypes.object,
  tags: PropTypes.object,
};

SortingAndFilteringSection.defaultProps = {
  itemType: "mug",
  manufacturers: null,
  tags: null,
};

export default SortingAndFilteringSection;

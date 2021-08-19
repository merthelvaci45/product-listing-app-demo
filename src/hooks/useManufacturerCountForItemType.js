import { useEffect, useState } from "react";

import { findNumberOfOccurencesOfItemsInArray } from "../utils";
import { useStore } from ".";

/**
 * this hook is responsible for extracting an object, whose keys are made out of each manufacturer name
 * and corresponding values are the count of how many products each manufacturer has for "mug" and "shirt" item types.
 * @param {Array} items: array of all products/items to be filtered out
 */
const useManufacturerCountForItemType = (items = []) => {
  const [manufacturerCountForMug, setManufacturerCountForMug] = useState();
  const [manufacturerCountForShirt, setManufacturerCountForShirt] = useState();

  const { appliedTagFilters } = useStore();

  useEffect(() => {
    // run this hook only if "items" has the populated data
    if (items.length > 0) {
      // first, extract all items with specific "mug" and "shirt" types
      const itemsOfMugType = items.filter((item) => item.itemType === "mug");
      const itemsOfShirtType = items.filter((item) => item.itemType === "shirt");

      // second, extract all brands available for "mug" and "shirt" types
      const availableBrandsForMugType = itemsOfMugType.map((itemType) => itemType.manufacturer);
      const availableBrandsForShirtType = itemsOfShirtType.map((itemType) => itemType.manufacturer);

      /* third, find out how many items with specific "itemType", i.e, "mug" or "shirt", a manufacturer has.
       * For this case, there will be 2 distinct main cases to be worked on. The first case is that "Tags - All"
       * option is NOT selected. In this case, there will be yet 2 distinct sub cases to be evaluated. The first
       * sub case is that none of the Tags filtering checkboxes is selected. In this case, all counts for "Brands"
       * checkboxes should be returned as being 0. The second sub case is that one or more Tags filtering checkboxes
       * is/are selected. In this case, "Brands - All" count and the count for each respective brand in
       * "availableBrandsForMugType (|| availableBrandsForShirtType)" array should be done by filtering "items" array
       * step by step.
       * -----------------------------------------------------------------------------------------------------
       * The second case is that "Tags - All" checkbox is selected. In this case, "Brands - All" count will be equal
       * to the total number of "mug (|| shirt)" type products in "items" array. Each respective count for each brand
       * is calculated via using "findNumberOfOccurencesOfItemsInArray" utility function, which is defined in
       * "../utils/findNumberOfOccurencesOfItemsInArray.js" file
       */
      setManufacturerCountForMug(() => {
        // if 'Tags - All' checkbox is NOT selected,
        if (!appliedTagFilters[0]?.includes("All")) {
          // and if no specific tag checkbox is selected,
          if (appliedTagFilters?.length === 0) {
            return availableBrandsForMugType.reduce((brandCounts, brand) => {
              return {
                ...brandCounts,
                "Brands - All": 0,
                [brand]: 0,
              };
            }, {});
          }
          // if one or more tag checkbox is/are selected,
          return availableBrandsForMugType.reduce((brandCounts, brand) => {
            return {
              ...brandCounts,
              "Brands - All": items
                .filter((prod) => prod.itemType === "mug")
                .filter((prod) => prod.tags.some((tag) => appliedTagFilters?.includes(tag))).length,
              [brand]: items
                .filter((prod) => prod.itemType === "mug")
                .filter((prod) => prod.tags.some((tag) => appliedTagFilters?.includes(tag)))
                .filter((prod) => prod.manufacturer === brand).length,
            };
          }, {});
        }

        // if 'Tags - All' checkbox is selected,
        return {
          "Brands - All": availableBrandsForMugType.length,
          ...findNumberOfOccurencesOfItemsInArray(availableBrandsForMugType),
        };
      });

      setManufacturerCountForShirt(() => {
        // if 'Tags - All' checkbox is NOT selected,
        if (!appliedTagFilters[0]?.includes("All")) {
          // and if no specific tag checkbox is selected,
          if (appliedTagFilters?.length === 0) {
            return availableBrandsForShirtType.reduce((brandCounts, brand) => {
              return {
                ...brandCounts,
                "Brands - All": 0,
                [brand]: 0,
              };
            }, {});
          }
          // if one or more tag checkbox is/are selected,
          return availableBrandsForShirtType.reduce((brandCounts, brand) => {
            return {
              ...brandCounts,
              "Brands - All": items
                .filter((prod) => prod.itemType === "shirt")
                .filter((prod) => prod.tags.some((tag) => appliedTagFilters?.includes(tag))).length,
              [brand]: items
                .filter((prod) => prod.itemType === "shirt")
                .filter((prod) => prod.tags.some((tag) => appliedTagFilters?.includes(tag)))
                .filter((prod) => prod.manufacturer === brand).length,
            };
          }, {});
        }

        // if 'Tags - All' checkbox is selected,
        return {
          "Brands - All": availableBrandsForShirtType.length,
          ...findNumberOfOccurencesOfItemsInArray(availableBrandsForShirtType),
        };
      });
    }
  }, [items, appliedTagFilters]);

  return [manufacturerCountForMug, manufacturerCountForShirt];
};

export default useManufacturerCountForItemType;

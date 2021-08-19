import { useEffect, useState } from "react";

import { findNumberOfOccurencesOfItemsInArray } from "../utils";
import { useStore } from ".";

/**
 * this hook is responsible for extracting an object, whose keys are made out of each tag name
 * and corresponding values are the count of how many products with each tag name for "mug" amd "shirt" item types.
 * @param {Array} items: array of all products/items to be filtered out
 */
const useTagCountForItemType = (items = []) => {
  const [tagCountForMug, setTagCountForMug] = useState();
  const [tagCountForShirt, setTagCountForShirt] = useState();

  const { appliedBrandFilters } = useStore();

  useEffect(() => {
    // run this hook only if "items" has the populated data
    if (items.length > 0) {
      // first, extract all items with specific "itemType"
      const itemsOfMugType = items.filter((item) => item.itemType === "mug");
      const itemsOfShirtType = items.filter((item) => item.itemType === "shirt");

      // second, extract all tags available for that specific "itemType"
      const availableTagsForMugType = itemsOfMugType.reduce((acc, cur) => [...acc, ...cur.tags], []);
      const availableTagsForShirtType = itemsOfShirtType.reduce((acc, cur) => [...acc, ...cur.tags], []);

      /* third, find out how many items with specific "itemType", i.e, "mug" or "shirt", a tag has.
       * For this case, there will be 2 distinct main cases to be worked on. The first case is that "Brands - All"
       * option is NOT selected. In this case, there will be yet 2 distinct sub cases to be evaluated. The first
       * sub case is that none of the Brands filtering checkboxes is selected. In this case, all counts for "Tags"
       * checkboxes should be returned as being 0. The second sub case is that one or more Brands filtering checkboxes
       * is/are selected. In this case, "Tags - All" count and the count for each respective tag in
       * "availableTagsForMugType (|| availableTagsForShirtType)" array should be done by filtering "items" array
       * step by step.
       * -----------------------------------------------------------------------------------------------------
       * The second case is that "Brands - All" checkbox is selected. In this case, "Tags - All" count will be equal
       * to the total number of "mug (|| shirt)" type products in "items" array. Each respective count for each tag
       * is calculated via using "findNumberOfOccurencesOfItemsInArray" utility function, which is defined in
       * "../utils/findNumberOfOccurencesOfItemsInArray.js" file
       */
      setTagCountForMug(() => {
        // if 'Brands - All' checkbox is NOT selected,
        if (!appliedBrandFilters[0]?.includes("All")) {
          // and if no specific brand checkbox is selected,
          if (appliedBrandFilters?.length === 0) {
            return availableTagsForMugType.reduce((tagCounts, tag) => {
              return {
                ...tagCounts,
                "Tags - All": 0,
                [tag]: 0,
              };
            }, {});
          }
          // if one or more brand checkbox is/are selected,
          return availableTagsForMugType.reduce((tagCounts, tag) => {
            return {
              ...tagCounts,
              "Tags - All": items
                .filter((prod) => prod.itemType === "mug")
                .filter((prod) => appliedBrandFilters.includes(prod.manufacturer)).length,
              [tag]: items
                .filter((prod) => prod.itemType === "mug")
                .filter((prod) => appliedBrandFilters.includes(prod.manufacturer))
                .filter((prod) => prod.tags.includes(tag)).length,
            };
          }, {});
        }

        // if 'Brands - All' checkbox is selected,
        return {
          "Tags - All": availableTagsForMugType.length,
          ...findNumberOfOccurencesOfItemsInArray(availableTagsForMugType),
        };
      });

      setTagCountForShirt(() => {
        // if 'Brands - All' checkbox is NOT selected,
        if (!appliedBrandFilters[0]?.includes("All")) {
          // and if no specific brand checkbox is selected,
          if (appliedBrandFilters?.length === 0) {
            return availableTagsForShirtType.reduce((tagCounts, tag) => {
              return {
                ...tagCounts,
                "Tags - All": 0,
                [tag]: 0,
              };
            }, {});
          }
          // if one or more brand checkbox is/are selected,
          return availableTagsForShirtType.reduce((tagCounts, tag) => {
            return {
              ...tagCounts,
              "Tags - All": items
                .filter((prod) => prod.itemType === "shirt")
                .filter((prod) => appliedBrandFilters.includes(prod.manufacturer)).length,
              [tag]: items
                .filter((prod) => prod.itemType === "shirt")
                .filter((prod) => appliedBrandFilters.includes(prod.manufacturer))
                .filter((prod) => prod.tags.includes(tag)).length,
            };
          }, {});
        }

        // if 'Brands - All' checkbox is selected,
        return {
          "Tags - All": availableTagsForShirtType.length,
          ...findNumberOfOccurencesOfItemsInArray(availableTagsForShirtType),
        };
      });
    }
  }, [items, appliedBrandFilters]); // eslint-disable-line react-hooks/exhaustive-deps

  return [tagCountForMug, tagCountForShirt];
};

export default useTagCountForItemType;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { findNumberOfOccurencesOfItemsInArray } from "../utils";

/**
 * this hook is responsible for extracting an object, whose keys are made out of each tag name
 * and corresponding values are the count of how many products with each tag name for "mug" amd "shirt" item types.
 * @param {Array} items: array of all products/items to be filtered out
 */
const useTagCountForItemType = (items = []) => {
  const [tagCountForMug, setTagCountForMug] = useState();
  const [tagCountForShirt, setTagCountForShirt] = useState();

  const { appliedBrandFilters } = useSelector((state) => state.productsSlice);

  useEffect(() => {
    // run this hook only if "items" has the populated data
    if (items.length > 0) {
      // first, extract all items with specific "itemType"
      const itemsOfMugType = items.filter((item) => item.itemType === "mug");
      const itemsOfShirtType = items.filter((item) => item.itemType === "shirt");

      // second, extract all tags available for that specific "itemType"
      const availableTagsForMugType = itemsOfMugType.reduce((acc, cur) => [...acc, ...cur.tags], []);
      const availableTagsForShirtType = itemsOfShirtType.reduce((acc, cur) => [...acc, ...cur.tags], []);

      // third, find out how many items with "mug" type, a tag has
      // and update "tagCountForItemType" state accordingly.
      // for this purpose, use "findNumberOfOccurencesOfItemsInArray" utility function
      // defined in "../utils/findNumberOfOccurencesOfItemsInArray.js" file
      setTagCountForMug(() => {
        // if 'Brands - All' checkbox is NOT selected,
        if (!appliedBrandFilters[0]?.includes("All")) {
          // and if no specific tag checkbox is selected,
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
          "Tags - All": items.length,
          ...findNumberOfOccurencesOfItemsInArray(availableTagsForMugType),
        };
      });

      setTagCountForShirt(() => {
        // if 'Brands - All' checkbox is NOT selected,
        if (!appliedBrandFilters[0]?.includes("All")) {
          // and if no specific tag checkbox is selected,
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
          "Tags - All": items.length,
          ...findNumberOfOccurencesOfItemsInArray(availableTagsForShirtType),
        };
      });
    }
  }, [items, appliedBrandFilters]); // eslint-disable-line react-hooks/exhaustive-deps

  return [tagCountForMug, tagCountForShirt];
};

export default useTagCountForItemType;

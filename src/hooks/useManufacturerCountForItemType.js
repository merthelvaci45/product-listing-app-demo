import { useEffect, useState } from "react";

import { findNumberOfOccurencesOfItemsInArray } from "../utils";

/**
 * this hook is responsible for extracting an object, whose keys are made out of each manufacturer name
 * and corresponding values are the count of how many products each manufacturer has for "itemType" argument.
 * @param {Array} items: array of all products/items to be filtered out
 * @param {String} itemType: "mug" || "shirt"
 */
const useManufacturerCountForItemType = (items = [], itemType = "") => {
  const [manufacturerCountForItemType, setManufacturerCountForItemType] =
    useState();

  useEffect(() => {
    // run this hook only if "items" has the populated data
    if (items.length > 0) {
      // first, extract all items with specific "itemType"
      const itemsOfSpecificType = items.filter(
        (item) => item.itemType === itemType
      );

      // second, extract all brands available for that specific "itemType"
      const availableBrandsForItemType = itemsOfSpecificType.map(
        (itemType) => itemType.manufacturer
      );

      // third, find out how many items with specific "itemType" a manufacturer has
      // and "manufacturerCountForItemType" state accordingly.
      // for this purpose, use "findNumberOfOccurencesOfItemsInArray" utility function
      // defined in "../utils/findNumberOfOccurencesOfItemsInArray.js" file
      setManufacturerCountForItemType(() => ({
        //All: items.length,
        "Brands - All": items.length,
        ...findNumberOfOccurencesOfItemsInArray(availableBrandsForItemType),
      }));
    }
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps
  return manufacturerCountForItemType;
};

export default useManufacturerCountForItemType;

import { useEffect, useState } from "react";

import { findNumberOfOccurencesOfItemsInArray } from "../utils";

/**
 * itemType = "mug" || "shirt"
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

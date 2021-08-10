import { useEffect, useState } from "react";

import { findNumberOfOccurencesOfItemsInArray } from "../utils";

/**
 * this hook is responsible for extracting an object, whose keys are made out of each manufacturer name
 * and corresponding values are the count of how many products each manufacturer has for "mug" and "shirt" item types.
 * @param {Array} items: array of all products/items to be filtered out
 */
const useManufacturerCountForItemType = (items = []) => {
  const [manufacturerCountForMug, setManufacturerCountForMug] = useState();

  const [manufacturerCountForShirt, setManufacturerCountForShirt] = useState();

  useEffect(() => {
    // run this hook only if "items" has the populated data
    if (items.length > 0) {
      // first, extract all items with specific "mug" and "shirt" types
      const itemsOfMugType = items.filter((item) => item.itemType === "mug");
      const itemsOfShirtType = items.filter(
        (item) => item.itemType === "shirt"
      );

      // second, extract all brands available for "mug" and "shirt" types
      const availableBrandsForMugType = itemsOfMugType.map(
        (itemType) => itemType.manufacturer
      );

      const availableBrandsForShirtType = itemsOfShirtType.map(
        (itemType) => itemType.manufacturer
      );

      // third, find out how many items with specific "itemType", i.e, "mug" or "shirt", a manufacturer has
      // and update "manufacturerCountForMugType" and "manufacturerCountForShirtType" states accordingly.
      // for this purpose, use "findNumberOfOccurencesOfItemsInArray" utility function
      // defined in "../utils/findNumberOfOccurencesOfItemsInArray.js" file
      setManufacturerCountForMug(() => ({
        //All: items.length,
        "Brands - All": items.length,
        ...findNumberOfOccurencesOfItemsInArray(availableBrandsForMugType),
      }));

      setManufacturerCountForShirt(() => ({
        //All: items.length,
        "Brands - All": items.length,
        ...findNumberOfOccurencesOfItemsInArray(availableBrandsForShirtType),
      }));
    }
  }, [items]);
  return [manufacturerCountForMug, manufacturerCountForShirt];
};

export default useManufacturerCountForItemType;

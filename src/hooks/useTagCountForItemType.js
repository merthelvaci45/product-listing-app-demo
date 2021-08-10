import { useEffect, useState } from "react";

import { findNumberOfOccurencesOfItemsInArray } from "../utils";

/**
 * this hook is responsible for extracting an object, whose keys are made out of each tag name
 * and corresponding values are the count of how many products with each tag name for "mug" amd "shirt" item types.
 * @param {Array} items: array of all products/items to be filtered out
 */
const useTagCountForItemType = (items = []) => {
  const [tagCountForMug, setTagCountForMug] = useState();
  const [tagCountForShirt, setTagCountForShirt] = useState();

  useEffect(() => {
    // run this hook only if "items" has the populated data
    if (items.length > 0) {
      // first, extract all items with specific "itemType"
      const itemsOfMugType = items.filter((item) => item.itemType === "mug");

      const itemsOfShirtType = items.filter(
        (item) => item.itemType === "shirt"
      );

      // second, extract all tags available for that specific "itemType"
      const availableTagsForMugType = itemsOfMugType.reduce(
        (acc, cur) => [...acc, ...cur.tags],
        []
      );

      const availableTagsForShirtType = itemsOfShirtType.reduce(
        (acc, cur) => [...acc, ...cur.tags],
        []
      );

      // third, find out how many items with "mug" type, a tag has
      // and update "tagCountForItemType" state accordingly.
      // for this purpose, use "findNumberOfOccurencesOfItemsInArray" utility function
      // defined in "../utils/findNumberOfOccurencesOfItemsInArray.js" file
      setTagCountForMug(() => ({
        //All: items.length,
        "Tags - All": items.length,
        ...findNumberOfOccurencesOfItemsInArray(availableTagsForMugType),
      }));

      setTagCountForShirt(() => ({
        //All: items.length,
        "Tags - All": items.length,
        ...findNumberOfOccurencesOfItemsInArray(availableTagsForShirtType),
      }));
    }
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  return [tagCountForMug, tagCountForShirt];
};

export default useTagCountForItemType;

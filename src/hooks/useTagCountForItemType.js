import { useEffect, useState } from "react";

import { findNumberOfOccurencesOfItemsInArray } from "../utils";

/**
 * itemType = "mug" || "shirt"
 */
const useTagCountForItemType = (items = [], itemType = "") => {
  const [tagCountForItemType, setTagCountForItemType] = useState();

  useEffect(() => {
    // run this hook only if "items" has the populated data
    if (items.length > 0) {
      // first, extract all items with specific "itemType"
      const itemsOfSpecificType = items.filter(
        (item) => item.itemType === itemType
      );

      // second, extract all tags available for that specific "itemType"
      const availableTagsForItemType = itemsOfSpecificType.reduce(
        (acc, cur) => [...acc, ...cur.tags],
        []
      );

      // third, find out how many items with specific "itemType" a tag has
      // and "tagCountForItemType" state accordingly.
      // for this purpose, use "findNumberOfOccurencesOfItemsInArray" utility function
      // defined in "../utils/findNumberOfOccurencesOfItemsInArray.js" file
      setTagCountForItemType(() => ({
        //All: items.length,
        "Tags - All": items.length,
        ...findNumberOfOccurencesOfItemsInArray(availableTagsForItemType),
      }));
    }
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps
  return tagCountForItemType;
};

export default useTagCountForItemType;

const findNumberOfOccurencesOfItemsInArray = (itemsArr = []) => {
  if (itemsArr.length === 0) return undefined;

  return itemsArr.reduce(
    (itemCounts, item) => ({
      ...itemCounts,
      [item]: itemCounts[item] ? itemCounts[item] + 1 : 1,
    }),
    {}
  );
};

export default findNumberOfOccurencesOfItemsInArray;

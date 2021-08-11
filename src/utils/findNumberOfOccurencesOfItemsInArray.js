const findNumberOfOccurencesOfItemsInArray = (itemsArr = []) => {
  if (itemsArr.length === 0) return;

  return itemsArr.reduce((itemCounts, item) => {
    return {
      ...itemCounts,
      [item]: itemCounts[item] ? itemCounts[item] + 1 : 1,
    };
  }, {});
};

export default findNumberOfOccurencesOfItemsInArray;

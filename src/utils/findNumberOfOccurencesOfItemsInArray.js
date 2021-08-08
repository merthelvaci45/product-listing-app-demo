const findNumberOfOccurencesOfItemsInArray = (itemsArr = []) => {
  if (itemsArr.length === 0) return;

  const countsOfItems = {};

  for (const item of itemsArr) {
    countsOfItems[item] = countsOfItems[item] ? countsOfItems[item] + 1 : 1;
  }

  return countsOfItems;
};

export default findNumberOfOccurencesOfItemsInArray;

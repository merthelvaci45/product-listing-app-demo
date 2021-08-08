import { SORT_OPTIONS } from ".";

const initialSortingRadioButtonsState = SORT_OPTIONS.reduce(
  (acc, cur) => ({ ...acc, [cur.id]: false }),
  {}
);

export default initialSortingRadioButtonsState;

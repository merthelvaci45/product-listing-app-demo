import { SORT_OPTIONS } from ".";

const initialSortingRadioButtonsState = SORT_OPTIONS.reduce(
  (sortOptions, option) => ({ ...sortOptions, [option.id]: false }),
  {}
);

export default initialSortingRadioButtonsState;

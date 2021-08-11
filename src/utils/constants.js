export const COMPANIES_API_BASE_URL = "http://localhost:4000/companies";
export const ITEMS_API_BASE_URL = "http://localhost:5000/items";

export const API_METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

export const PAGE_ROUTES = {
  products: "/",
};

export const SORT_OPTIONS_IDS = {
  ASCENDING_PRICE: "ascendingPrice",
  DESCENDING_PRICE: "descendingPrice",
  TO_OLDEST: "toOldest",
  TO_NEWEST: "toNewest",
};

export const SORT_OPTIONS = [
  {
    id: SORT_OPTIONS_IDS.ASCENDING_PRICE,
    label: "Price low to high",
  },
  {
    id: SORT_OPTIONS_IDS.DESCENDING_PRICE,
    label: "Price high to low",
  },
  { id: SORT_OPTIONS_IDS.TO_OLDEST, label: "New to old" },
  { id: SORT_OPTIONS_IDS.TO_NEWEST, label: "Old to new" },
];

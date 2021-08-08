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

export const SORT_OPTIONS = [
  { id: "ascendingPrice", label: "Price low to high" },
  { id: "descendingPrice", label: "Price high to low" },
  { id: "toOldest", label: "New to old" },
  { id: "toNewest", label: "Old to new" },
];

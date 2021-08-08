import { useEffect, useState } from "react";

import { axiosInstance } from "../config";
import { API_METHODS } from "../utils";

/**
 * this hook is responsible for making an API request using its 4 optional named parameters "queryPath", "method",
 * "headers" and "body". All of them are initialized to their respective default values. Note that "body" parameter
 * should be provided for API requests other than GET method as described in the documentation of "axios" package.
 * Since fetched data will be in JSON format, "Content-Type" is set to default as "application/json". If API request
 * will be successful, axios instance returns an object with "data" property in which all API data is held. For this
 * reason, "data" property is pulled out from the request result.
 * "method" parameter is defined to have an "enum" like value provided by "API_METHODS" object. For further details,
 * please refer to "../utils/constants.js".
 */
const useAPI = ({
  queryPath = "",
  method = API_METHODS.GET,
  headers = { "Content-Type": "application/json" },
  body = {},
}) => {
  const [apiData, setApiData] = useState(); // state to hold returned API data from backend in case of successful request
  const [isLoading, setIsLoading] = useState(true); // state to be set while API request is in progress and to display user a loading indicator
  const [isError, setIsError] = useState(false); // state to be set in case of any error while making request to API

  useEffect(() => {
    // this handler function is responsible for making the request to API
    const fetchFromAPIHandler = async () => {
      try {
        // at the start of a request, reset "isError" state to initial value
        setIsError(false);

        const { data } = await axiosInstance({
          method,
          url: queryPath,
          headers,
          data: method !== API_METHODS.GET ? body : null,
        }); // make API request
        setApiData(() => data); // update "apiData" state
      } catch (error) {
        setIsError(true); // set "isError" state to true in case of error
        console.log(error);
      } finally {
        setIsLoading(false); // no matter what returns from API call, set "isLoading" status to false.
      }
    };

    fetchFromAPIHandler(); // invoke the handler function
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [apiData, isLoading, isError];
};

export default useAPI;

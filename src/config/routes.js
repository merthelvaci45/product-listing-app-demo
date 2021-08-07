import React, { lazy, Suspense } from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { PAGE_ROUTES } from "../utils";

const AllProducts = lazy(() => import("../pages/AllProducts"));

/**
 * Routing Pages
 * Add all site pages here
 */
export default (
  <Router>
    <Suspense fallback={<small>Loading...</small>}>
      <Switch>
        <Route exact path={PAGE_ROUTES.products} component={AllProducts} />
      </Switch>
    </Suspense>
  </Router>
);

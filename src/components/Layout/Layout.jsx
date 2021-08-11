import PropTypes from "prop-types";

import classes from "./Layout.module.scss";

import { Footer, Header } from "..";

/**
 * this component is a wrapper for any page component
 * and it defines the general layout for each page.
 * namely, it adds a <Header> and <Footer> components
 * to each page by default.
 * @param {Node} children: JSX node element to be rendered
 */
const Layout = ({ children }) => (
  <>
    <Header />
    <main className={classes.Layout}>{children}</main>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

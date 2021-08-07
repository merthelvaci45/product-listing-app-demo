import PropTypes from "prop-types";

import classes from "./Layout.module.scss";

import Footer from "../Footer";
import Header from "../Header";

/**
 * this component is a wrapper for any page component
 * and it defines the general layout for each page.
 * namely, it adds a Header, Backdrop and MobileDrawerMenu
 * to each page by default
 */
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={classes.Layout}>{children}</main>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

//import PropTypes from "prop-types";

import classes from "./Header.module.scss";

import Logo from "../Logo";
import Text from "../Text";

const Header = () => {
  return (
    <header className={classes.Header}>
      <div className={classes.ContainerFluid}>
        <Logo />
        <div className={classes.TotalPrice}>
          <i className="fas fa-shopping-bag"></i>
          <Text color="White" fontWeight="FontWeight600" text="₺ 39.97" />
        </div>
      </div>
    </header>
  );
};

/* Header.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
}; */

export default Header;

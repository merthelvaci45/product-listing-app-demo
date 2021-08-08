import { useSelector } from "react-redux";
//import PropTypes from "prop-types";

import classes from "./Header.module.scss";

import Logo from "../Logo";
import Text from "../Text";

const Header = () => {
  const totalPrice = useSelector((state) => state.cartSlice.totalPrice);

  return (
    <header className={classes.Header}>
      <div className={classes.ContainerFluid}>
        <Logo />
        <div className={classes.TotalPrice}>
          <i className="fas fa-shopping-bag"></i>
          <Text
            color="White"
            fontWeight="FontWeight600"
            text={`₺ ${totalPrice.toFixed(2)}`}
          />
        </div>
      </div>
    </header>
  );
};

/* Header.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
}; */

export default Header;

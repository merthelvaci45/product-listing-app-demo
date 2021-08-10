import { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Header.module.scss";

import ShoppingCart from "../ShoppingCart";
import FlatButton from "../FlatButton";
import Logo from "../Logo";
import Modal from "../Modal";
import Text from "../Text";

const Header = () => {
  const [
    isShoppingCartDisplayedForMobile,
    setIsShoppingCartDisplayedForMobile,
  ] = useState(false);
  const totalPrice = useSelector((state) => state.cartSlice.totalPrice);

  const displayShoppingCartForMobileHandler = () =>
    setIsShoppingCartDisplayedForMobile(true);
  const hideShoppingCartForMobileHandler = () =>
    setIsShoppingCartDisplayedForMobile(false);

  return (
    <>
      <Modal
        isModalOpen={isShoppingCartDisplayedForMobile}
        onDismissModal={hideShoppingCartForMobileHandler}
      >
        <ShoppingCart />
      </Modal>
      <header className={classes.Header}>
        <FlatButton onPressed={displayShoppingCartForMobileHandler}>
          <i className="fas fa-shopping-cart"></i>
        </FlatButton>
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
    </>
  );
};

export default Header;

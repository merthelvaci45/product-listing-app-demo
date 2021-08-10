import { useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Header.module.scss";

import { FlatButton, Logo, Modal, ShoppingCart, Text } from "..";

const Header = () => {
  const [
    isShoppingCartDisplayedForMobile,
    setIsShoppingCartDisplayedForMobile,
  ] = useState(false);
  const totalPrice = useSelector((state) => state.cartSlice.totalPrice); // extract "totalPrice" state of "cartSlice"

  /**
   * this handler function is responsible for displaying current shopping cart to user
   * within a Modal upon pressing shopping cart icon, which is placed at the right of
   * <Header> component for mobile and at the left for tablet size devices.
   */
  const displayShoppingCartForMobileHandler = () =>
    setIsShoppingCartDisplayedForMobile(true);

  /**
   * this handler function is responsible for dismissing current shopping cart displayed
   * within a Modal for mobile and tablet size devices.
   */
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

import { useState } from "react";

import classes from "./Header.module.scss";

import { FlatButton, Logo, Modal, ShoppingCart, Text } from "..";
import { useStore } from "../../hooks";

const Header = () => {
  const [isShoppingCartDisplayedForMobile, setIsShoppingCartDisplayedForMobile] = useState(false);
  const { totalPrice } = useStore();

  /**
   * this handler function is responsible for displaying current shopping cart to user
   * within a Modal upon pressing shopping cart icon, which is placed at the right of
   * <Header> component for mobile and at the left for tablet size devices.
   */
  const displayShoppingCartForMobileHandler = () => setIsShoppingCartDisplayedForMobile(true);

  /**
   * this handler function is responsible for dismissing current shopping cart displayed
   * within a Modal for mobile and tablet size devices.
   */
  const hideShoppingCartForMobileHandler = () => setIsShoppingCartDisplayedForMobile(false);

  return (
    <>
      <Modal isModalOpen={isShoppingCartDisplayedForMobile} onDismissModal={hideShoppingCartForMobileHandler}>
        <ShoppingCart />
      </Modal>
      <header className={classes.Header}>
        <FlatButton onPressed={displayShoppingCartForMobileHandler}>
          <i className="fas fa-shopping-cart" />
        </FlatButton>
        <div className={classes.ContainerFluid}>
          <Logo />
          <div className={classes.TotalPrice}>
            <i className="fas fa-shopping-bag" />
            <Text
              color="White"
              fontWeight="FontWeight600"
              text={`₺ ${totalPrice <= 0.0 ? Math.round(totalPrice).toFixed(2) : totalPrice.toFixed(2)}`}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

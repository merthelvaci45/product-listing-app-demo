import classes from "./Basket.module.scss";

import ProductInBasket from "../ProductInBasket";
import Text from "../Text";

const Basket = () => {
  return (
    <div className={classes.Basket}>
      <ProductInBasket />
      <ProductInBasket />
      <ProductInBasket />
      <ProductInBasket />
      <div className={classes.BasketPrice}>
        <Text fontWeight="FontWeight600" text="₺ 39.97" />
      </div>
    </div>
  );
};

export default Basket;

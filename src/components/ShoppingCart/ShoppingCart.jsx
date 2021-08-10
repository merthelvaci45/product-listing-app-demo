import { useSelector } from "react-redux";
import classes from "./ShoppingCart.module.scss";

import ProductInBasket from "../ProductInBasket";
import Text from "../Text";

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cartSlice.cart);
  const totalPrice = useSelector((state) => state.cartSlice.totalPrice);

  // TODO: add a condition for when cart.length = 0. display an informative text to user that s/he has no item(s) in basket
  return (
    <section className={classes.RightSection}>
      <div className={classes.ShoppingCart}>
        {cart.length === 0 ? (
          <span>No products available</span>
        ) : (
          cart.map((product) => (
            <ProductInBasket
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))
        )}
        <div className={classes.BasketPrice}>
          <Text
            fontWeight="FontWeight600"
            text={`₺ ${totalPrice.toFixed(2)}`}
          />
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;

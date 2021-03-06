import classes from "./ShoppingCart.module.scss";

import { ProductInShoppingCart, Text } from "..";
import { useStore } from "../../hooks";

const ShoppingCart = () => {
  const { cart, totalPrice } = useStore();

  return (
    <section className={classes.RightSection}>
      <div className={classes.ShoppingCart}>
        {cart.length === 0 ? (
          <span>No products available</span>
        ) : (
          cart.map((product) => (
            <ProductInShoppingCart
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
            text={`₺ ${totalPrice <= 0.0 ? Math.round(totalPrice).toFixed(2) : totalPrice.toFixed(2)}`}
          />
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;

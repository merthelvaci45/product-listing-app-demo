import { useSelector } from "react-redux";
import classes from "./ShoppingCart.module.scss";

import { ProductInShoppingCart, Text } from "..";

const ShoppingCart = () => {
  const { cart, totalPrice } = useSelector((state) => state.cartSlice); // extract "cart" and "totalPrice" states from "cartSlice" slice of redux store

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
            text={`₺ ${totalPrice.toFixed(2)}`}
          />
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;

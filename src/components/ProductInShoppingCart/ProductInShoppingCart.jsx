import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import classes from "./ProductInShoppingCart.module.scss";

import { cartActions } from "../../store/slices";

import { FlatButton, Text } from "..";

/**
 * this component constitutes a product name and price with its quantity
 * and plus/minus buttons to manipulate the current quantity of the product
 * in the shopping cart sitting next to each other.
 * which looks exactly the same with the one specified in Figma design.
 * @param {String} id: unique prop to keep track of each product(=item)
 * @param {Number} price: price of each product
 * @param {String} name: prop to hold name of each product
 * @param {Number} quantity: quantity of product in the cart
 */
const ProductInShoppingCart = ({ id, name, price, quantity }) => {
  const dispatch = useDispatch();

  const removeProductFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart({ id }));
  };

  const addProductToCartHandler = () => {
    dispatch(cartActions.addItemToCart({ id, name, price }));
  };

  return (
    <div className={classes.ProductInShoppingCart}>
      <div className={classes.ProductNameAndPrice}>
        <Text color="TextPrimary" text={name} />
        <Text fontWeight="FontWeight600" text={`₺ ${price}`} />
      </div>
      <div className={classes.ProductQuantity}>
        <FlatButton onPressed={removeProductFromCartHandler}>
          <i className="fas fa-minus"></i>
        </FlatButton>
        <div>
          <Text
            color="White"
            fontSize="FontSize15"
            fontWeight="FontWeight700"
            text={quantity.toString()}
          />
        </div>
        <FlatButton onPressed={addProductToCartHandler}>
          <i className="fas fa-plus"></i>
        </FlatButton>
      </div>
    </div>
  );
};

ProductInShoppingCart.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ProductInShoppingCart;

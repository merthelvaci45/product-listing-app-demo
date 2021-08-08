import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import classes from "./ProductInBasket.module.scss";

import { cartActions } from "../../store/slices";

import FlatButton from "../FlatButton";
import Text from "../Text";

const ProductInBasket = ({ id, name, price, quantity }) => {
  const dispatch = useDispatch();

  const removeProductFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart({ id }));
  };

  const addProductToCartHandler = () => {
    dispatch(cartActions.addItemToCart({ id, name, price }));
  };

  return (
    <div className={classes.ProductInBasket}>
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

ProductInBasket.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default ProductInBasket;

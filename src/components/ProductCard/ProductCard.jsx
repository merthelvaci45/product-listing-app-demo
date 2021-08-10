import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import classes from "./ProductCard.module.scss";

import Button from "../Button";
import Image from "../Image";
import Text from "../Text";

import { dummyProductImage } from "./util";
import { cartActions } from "../../store/slices";

/**
 * this component constitutes a product card which looks exactly the same with the one specified in Figma design.
 * @param {String} id: unique prop to keep track of each product(=item)
 * @param {Number} price: price of each product
 * @param {String} productName: prop to hold name of each product
 */
const ProductCard = ({ id, price, productName }) => {
  const dispatch = useDispatch();

  /**
   * this handler function is responsible for dispatching the required action of "cartSlice" slice of redux store
   * in order to add an item with the specified "id", "name" and "price" properties to the user shopping cart.
   */
  const addProductToCartHandler = () => {
    dispatch(cartActions.addItemToCart({ id, name: productName, price }));
  };

  return (
    <div className={classes.ProductCard}>
      <Image
        imgFallbackSrc={dummyProductImage.source.fallback}
        imgWebpSrc={dummyProductImage.source.webp}
        imgAltText={dummyProductImage.altText}
      />
      <Text
        color="Primary"
        fontWeight="FontWeight700"
        isBlockDisplay
        text={`₺ ${price}`}
      />
      <Text
        color="TextPrimary"
        fontWeight="FontWeight600"
        isBlockDisplay
        text={productName}
      />
      <Button isBlockButton onClicked={addProductToCartHandler}>
        Add
      </Button>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};

export default ProductCard;

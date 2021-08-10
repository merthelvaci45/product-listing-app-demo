import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import classes from "./ProductCard.module.scss";

import Button from "../Button";
import Image from "../Image";
import Text from "../Text";

import { dummyProductImage } from "./util";
import { cartActions } from "../../store/slices";

const ProductCard = ({ id, price, productName }) => {
  const dispatch = useDispatch();

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

import PropTypes from "prop-types";

import classes from "./ProductCard.module.scss";

import Button from "../Button";
import Image from "../Image";
import Text from "../Text";

const ProductCard = ({ price, productName }) => {
  return (
    <div className={classes.ProductCard}>
      <Image />
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
      <Button onClicked={() => {}}>Add</Button>
    </div>
  );
};

ProductCard.propTypes = {
  price: PropTypes.number.isRequired,
  productName: PropTypes.string.isRequired,
};

export default ProductCard;

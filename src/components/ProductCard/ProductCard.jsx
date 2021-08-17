import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import classes from "./ProductCard.module.scss";

import { Button, Image, Text } from "..";

import { dummyProductImage } from "./util";
import { cartActions } from "../../store/slices";
import { useStore } from "../../hooks";

/**
 * this component constitutes a product card which looks exactly the same with the one specified in Figma design.
 * @param {String} id: unique prop to keep track of each product(=item)
 * @param {Number} price: price of each product
 * @param {String} productName: prop to hold name of each product
 */
const ProductCard = ({ id, price, productName }) => {
  // this state is used to simulate a waiting process when user adds a product to cart.
  // whenever "Add" button is pressed, "Processing..." text is displayed to user to
  // inform him/her about current situation of the action. this is needed for better UX.
  const [isFakeAddingActionInProgress, setIsFakeAddingActionInProgress] = useState(false);
  const { dispatch } = useStore();

  /**
   * this handler function is responsible for dispatching the required action of "cartSlice" slice of redux store
   * in order to add an item with the specified "id", "name" and "price" properties to the user shopping cart.
   */
  const addProductToCartHandler = () => {
    setIsFakeAddingActionInProgress(true);
    dispatch(
      cartActions.addItemToCart({
        id,
        name: productName,
        price,
      })
    );
  };

  /**
   * this effect hook is responsible for simulating a waiting process for a time period of 500ms
   * while a product is being added to cart by user. note that after each render, "timer" object
   * is cleared so that any possible memory leak can be prevented in advance.
   */
  useEffect(() => {
    let timer;
    if (isFakeAddingActionInProgress) {
      timer = setTimeout(() => {
        setIsFakeAddingActionInProgress(false);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [isFakeAddingActionInProgress]);

  return (
    <div className={classes.ProductCard}>
      <Image
        imgFallbackSrc={dummyProductImage.source.fallback}
        imgWebpSrc={dummyProductImage.source.webp}
        imgAltText={dummyProductImage.altText}
      />
      <Text color="Primary" fontWeight="FontWeight700" isBlockDisplay text={`₺ ${price}`} />
      <Text color="TextPrimary" fontWeight="FontWeight600" isBlockDisplay text={productName} />
      <Button isBlockButton onClicked={addProductToCartHandler}>
        {isFakeAddingActionInProgress ? "Processing..." : "Add"}
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

import classes from "./ProductInBasket.module.scss";

import FlatButton from "../FlatButton";
import Text from "../Text";

const ProductInBasket = () => {
  return (
    <div className={classes.ProductInBasket}>
      <div className={classes.ProductNameAndPrice}>
        <Text color="TextPrimary" text="Product Name" />
        <Text fontWeight="FontWeight600" text="₺ 14.99">
          Price
        </Text>
      </div>
      <div className={classes.ProductQuantity}>
        <FlatButton onPressed={() => {}}>
          <i className="fas fa-minus"></i>
        </FlatButton>
        <div>
          <Text
            color="White"
            fontSize="FontSize15"
            fontWeight="FontWeight700"
            text="1"
          />
        </div>
        <FlatButton onPressed={() => {}}>
          <i className="fas fa-plus"></i>
        </FlatButton>
      </div>
    </div>
  );
};

export default ProductInBasket;

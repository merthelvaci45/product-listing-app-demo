import PropTypes from "prop-types";

import classes from "./ItemType.module.scss";

import Text from "../Text";

const ItemType = ({ isContrasted, itemType }) => {
  return (
    <div
      className={`${classes.ItemType} ${
        isContrasted ? classes.LightBlueBg : classes.PrimaryBg
      }`}
    >
      <Text
        color={isContrasted ? "Primary" : "LightBlue"}
        fontSize="FontSize13"
        fontWeight="FontWeight600"
        text={itemType}
      />
    </div>
  );
};

ItemType.propTypes = {
  itemType: PropTypes.string.isRequired,
};

export default ItemType;

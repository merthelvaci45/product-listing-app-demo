import PropTypes from "prop-types";

import classes from "./ItemType.module.scss";

import Button from "../Button";
import Text from "../Text";

const ItemType = ({ isSelected, onClicked, itemType }) => {
  return (
    <Button
      onClicked={onClicked}
      overrideClassName={classes.ItemType}
      type={!isSelected ? "Secondary" : "Primary"}
    >
      <Text
        color={!isSelected ? "Primary" : "LightBlue"}
        fontSize="FontSize13"
        fontWeight="FontWeight600"
        text={itemType}
      />
    </Button>
  );
};

ItemType.propTypes = {
  isSelected: PropTypes.bool,
  itemType: PropTypes.string.isRequired,
  onClicked: PropTypes.func.isRequired,
};

ItemType.defaultProps = {
  isSelected: false,
};

export default ItemType;

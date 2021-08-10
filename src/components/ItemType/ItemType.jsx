import PropTypes from "prop-types";

import classes from "./ItemType.module.scss";

import { Button, Text } from "..";

/**
 * this component consitutes each pressable item type for displaying a collection of products
 * belonging to a specific "itemType". they are displayed at top of listed products and under
 * "Products" title.
 * @param {boolean} isSelected: prop to keep track of "selected" value of the component. depending on its value, a specific classname will be attached
 * @param {Function} onClicked: prop to determine what happens when the component is pressed upon
 * @param {String} itemType: prop to render name of the component
 */
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

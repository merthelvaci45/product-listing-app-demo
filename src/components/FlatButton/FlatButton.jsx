import PropTypes from "prop-types";

import classes from "./FlatButton.module.scss";

/**
 * this component constitutes a pressable button component as <Button> component does.
 * the difference is that this component looks like a normal text but still is pressable,
 * i.e, there is no background color or border assigned to it by default (Note that depending
 * on "isBorderedStyle" value, a border can still be assigned).
 */
const FlatButton = ({
  children, // normal JSX node to be displayed to user as the content of the component
  id, // prop to keep track of the node value of "children" prop in case of need
  isBorderedStyle, // bool prop to check whether the component is bordered or not
  isNotPrimaryColor, // bool prop to determine content color. if true, content color will be #697488, otherwise #1ea4ce
  onPressed, // prop to trigger "onClick" method of native <button> component
}) => (
  <button
    className={`${classes.FlatButton} ${isNotPrimaryColor ? classes.DarkGray : classes.Primary} ${
      isBorderedStyle ? classes.Bordered : ""
    }`}
    id={id}
    onClick={onPressed}
    type="button">
    {children}
  </button>
);

FlatButton.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  isBorderedStyle: PropTypes.bool,
  isNotPrimaryColor: PropTypes.bool,
  onPressed: PropTypes.func.isRequired,
};

FlatButton.defaultProps = {
  id: null,
  isBorderedStyle: false,
  isNotPrimaryColor: false,
};

export default FlatButton;

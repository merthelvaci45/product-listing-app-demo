import PropTypes from "prop-types";

import classes from "./FlatButton.module.scss";

const FlatButton = ({
  children,
  id,
  isBorderedStyle,
  isNotPrimaryColor,
  onPressed,
}) => {
  return (
    <button
      className={`${classes.FlatButton} ${
        isNotPrimaryColor ? classes.DarkGray : classes.Primary
      } ${isBorderedStyle ? classes.Bordered : ""}`}
      id={id}
      onClick={onPressed}
    >
      {children}
    </button>
  );
};

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

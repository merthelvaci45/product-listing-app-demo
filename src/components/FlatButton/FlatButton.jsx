import PropTypes from "prop-types";

import classes from "./FlatButton.module.scss";

const FlatButton = ({ children, isNotPrimaryColor, onPressed }) => {
  return (
    <button
      className={`${classes.FlatButton} ${
        isNotPrimaryColor ? classes.DarkGray : classes.Primary
      }`}
      onClick={onPressed}
    >
      {children}
    </button>
  );
};

FlatButton.propTypes = {
  children: PropTypes.node.isRequired,
  isNotPrimaryColor: PropTypes.bool,
  onPressed: PropTypes.func.isRequired,
};

FlatButton.defaultProps = {
  isNotPrimaryColor: false,
};

export default FlatButton;

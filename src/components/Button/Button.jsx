import PropTypes from "prop-types";

import classes from "./Button.module.scss";

const Button = ({ children, onClicked, type }) => {
  return (
    <button
      className={`${classes.Button} ${classes[type]}`}
      onClick={onClicked}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClicked: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: "Primary",
};

export default Button;

import PropTypes from "prop-types";

import classes from "./Button.module.scss";

const Button = ({
  children,
  isBlockButton,
  onClicked,
  overrideClassName,
  type,
}) => {
  return (
    <button
      className={`${classes.Button} ${
        isBlockButton ? classes.BlockButton : classes.InlineButton
      } ${classes[type]} ${overrideClassName}`}
      onClick={onClicked}
      type="button"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  isBlockButton: PropTypes.bool,
  onClicked: PropTypes.func.isRequired,
  overrideClassName: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  isBlockButton: false,
  overrideClassName: "",
  type: "Primary",
};

export default Button;

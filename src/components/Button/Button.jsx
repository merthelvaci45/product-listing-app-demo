import PropTypes from "prop-types";

import classes from "./Button.module.scss";

/**
 * this component constitutes a pressable button component, whose style(s) is/are updated
 * to have a default layout throughout the whole app.
 */
const Button = ({
  children, // normal JSX node to be displayed to user as the content of the component
  isBlockButton, // if true, the component will span the whole width, in which it resides, otherwise it will be inline
  onClicked, // prop to trigger "onClick" method of native <button> component
  overrideClassName, // prop to further stylize this component from outside (customly). it can take any number of classnames
  type, // prop to determine background color of the component. (Primary || Secondary): (#1ea4ce || #f2f0fd)
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

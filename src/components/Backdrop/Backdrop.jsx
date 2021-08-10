import PropTypes from "prop-types";

import classes from "./Backdrop.module.scss";

/**
 * this component adds a semi-transparent layer, which is dismissible upon click, to screen
 */
const Backdrop = ({ isBackdropActivated, onDismiss }) => {
  return (
    isBackdropActivated && (
      <button
        type="button"
        role="presentation"
        className={classes.Backdrop}
        onClick={onDismiss}
      ></button>
    )
  );
};

Backdrop.propTypes = {
  isBackdropActivated: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
};

Backdrop.defaultProps = {
  isBackdropActivated: false,
};

export default Backdrop;

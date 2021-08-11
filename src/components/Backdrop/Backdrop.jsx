import PropTypes from "prop-types";

import classes from "./Backdrop.module.scss";

/**
 * this component adds a semi-transparent layer, which is dismissible upon click, to screen
 */
const Backdrop = ({ isBackdropActivated, onDismiss }) =>
  isBackdropActivated && <button type="button" className={classes.Backdrop} onClick={onDismiss} />;

Backdrop.propTypes = {
  isBackdropActivated: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
};

Backdrop.defaultProps = {
  isBackdropActivated: false,
};

export default Backdrop;

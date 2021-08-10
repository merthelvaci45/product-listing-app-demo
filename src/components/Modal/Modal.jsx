import PropTypes from "prop-types";

import classes from "./Modal.module.scss";

import Backdrop from "../Backdrop";

const Modal = ({ children, isModalOpen, onDismissModal }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Backdrop isBackdropActivated={isModalOpen} onDismiss={onDismissModal} />
      <div
        aria-label="Pop-up modal"
        className={`${classes.Modal} ${
          isModalOpen ? classes.Open : classes.Closed
        }`}
        role="presentation"
        tabIndex="0"
        type="button"
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isModalOpen: PropTypes.bool,
  onDismissModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  isModalOpen: false,
};

export default Modal;

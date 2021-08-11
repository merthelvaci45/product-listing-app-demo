import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import classes from "./Modal.module.scss";

import { Backdrop } from "..";

/**
 * this component is opened on top of all screen components with the content provided as "children" prop
 * when triggered. it is also dismissable upon when <Backdrop> component, which resides behind this component,
 * is pressed.
 * @param {Node} children: JSX node to be rendered as the content of this component
 * @param {boolean} isModalOpen: prop to keep track of whether this component is opened or not
 * @param {Function} onDismissModal: prop to dismiss the component whenever it was activated before.
 */
const Modal = ({ children, isModalOpen, onDismissModal }) => {
  const modalNode = document.querySelector("#modal");
  const modalContent = (
    <div className={classes.Wrapper}>
      <Backdrop isBackdropActivated={isModalOpen} onDismiss={onDismissModal} />
      <div
        aria-label="Pop-up modal"
        className={`${classes.Modal} ${isModalOpen ? classes.Open : classes.Closed}`}
        role="button"
        tabIndex="0">
        {children}
      </div>
    </div>
  );

  return createPortal(modalContent, modalNode);
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

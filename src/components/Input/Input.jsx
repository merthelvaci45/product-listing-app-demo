import PropTypes from "prop-types";

import classes from "./Input.module.scss";

/**
 * this component constitutes browser native <input /> component but with a
 * customized style given in Figma design for filtering text inputs.
 * @param {String} id: prop to determine which specific input element being modified
 * @param {Function} onChanged: prop to change current text input value on each key stroke
 * @param {String} placeholder: prop to display a text as placeholder when input not typed
 * @param {String} value: prop to keep track of currently typed input field value. it must
 * be used alongside "onChange" prop of <input /> element for providing for two-way binding of data
 */
const Input = ({ id, onChanged, placeholder, value }) => (
  <input className={classes.Input} id={id} onChange={onChanged} placeholder={placeholder} value={value} />
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  onChanged: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Input.defaultProps = {
  placeholder: "",
};

export default Input;

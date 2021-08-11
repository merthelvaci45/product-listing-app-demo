import PropTypes from "prop-types";

import classes from "./Checkbox.module.scss";

import { Text } from "..";

/**
 * this component extends from native browser checkbox input element
 * with a customized style based on the specified UI in Figma design.
 * @param {boolean} isChecked: prop to hold whether checkbox is checked
 * @param {String} id: prop to associate <label> with respective <input /> element
 * @param {String} label: prop to display checkbox label text
 * @param {Function} onChanged: prop to toggle checked status of checkbox
 * @param {Number} quantity: prop to display the quantity of each checkbox item
 *  within parantheses in "Tags" and "Brands" filtering options
 */
const Checkbox = ({ isChecked, id, label, onChanged, quantity }) => (
  <>
    <label className={classes.Label} htmlFor={id}>
      <Text color="TextSecondary" text={label} />
      <span />
      <Text color="Gray300" text={`(${quantity})`} />
      <input id={id} name={id} checked={isChecked} onChange={onChanged} type="checkbox" />
      <span className={classes.Checkmark} />
    </label>
  </>
);

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChanged: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

Checkbox.defaultProps = {
  isChecked: false,
};

export default Checkbox;

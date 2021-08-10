import PropTypes from "prop-types";

import classes from "./RadioButton.module.scss";

import Text from "../Text";

/**
 * this component extends from native browser radio input element with
 * a customized style based on the specified UI in Figma design.
 * @param {boolean} isChecked: prop to hold whether radio button is checked
 * @param {String} id: prop to associate <label> with respective <input /> element
 * @param {String} label: prop to display radio button label text
 * @param {Function} onChanged: prop to toggle checked status of radio button
 */
const RadioButton = ({ isChecked, id, label, onChanged }) => {
  return (
    <label className={classes.Label} htmlFor={id}>
      <Text color="TextSecondary" text={label} />
      <input
        id={id}
        name={id}
        checked={isChecked}
        onChange={onChanged}
        type="radio"
      />
      <span className={classes.Checkmark} />
    </label>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChanged: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
  isChecked: false,
};

export default RadioButton;

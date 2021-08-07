import PropTypes from "prop-types";

import classes from "./RadioButton.module.scss";

import Text from "../Text";

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

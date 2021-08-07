import PropTypes from "prop-types";

import classes from "./Checkbox.module.scss";

import Text from "../Text";

const Checkbox = ({ isChecked, id, label, onChanged, quantity }) => {
  return (
    <>
      <label className={classes.Label} htmlFor={id}>
        <Text color="TextSecondary" text={label} />
        <span />
        <Text color="Gray300" text={`(${quantity})`} />
        <input
          id={id}
          name={id}
          checked={isChecked}
          onChange={onChanged}
          type="checkbox"
        />
        <span className={classes.Checkmark} />
      </label>
    </>
  );
};

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

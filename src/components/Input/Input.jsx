import PropTypes from "prop-types";

import classes from "./Input.module.scss";

const Input = ({ id, onChanged, placeholder, value }) => {
  return (
    <input
      className={classes.Input}
      id={id}
      onChange={onChanged}
      placeholder={placeholder}
      value={value}
    />
  );
};

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

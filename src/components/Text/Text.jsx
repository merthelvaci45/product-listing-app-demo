import PropTypes from "prop-types";

import classes from "./Text.module.scss";

const Text = ({ color, fontSize, fontWeight, isBlockDisplay, text }) => {
  const TextComponent = isBlockDisplay ? "p" : "span";

  return (
    <TextComponent
      style={{ marginBottom: isBlockDisplay ? ".5rem" : "0" }}
      className={`${classes[color]} ${classes[fontSize]} ${classes[fontWeight]}`}
    >
      {text}
    </TextComponent>
  );
};

Text.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  isBlockDisplay: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

Text.defaultProps = {
  color: "Primary",
  fontSize: "FontSize14",
  fontWeight: "FontWeight400",
  isBlockDisplay: false,
};

export default Text;

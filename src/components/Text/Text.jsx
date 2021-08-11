import PropTypes from "prop-types";

import classes from "./Text.module.scss";

/**
 * this component constitutes a text with all the properties defined by the props of the component.
 * @param {String} color: text color to be displayed
 * @param {String} fonSize: font-size of text
 * @param {String} fontWeight: font-weight of text
 * @param {boolea} isBlockDisplay: prop to decide whether the component will span the whole width of its parent or not
 * @param {String} text: actual content of the component to be displayed
 */
const Text = ({ color, fontSize, fontWeight, isBlockDisplay, text }) => {
  const TextComponent = isBlockDisplay ? "p" : "span";

  return (
    <TextComponent
      style={{
        marginBottom: isBlockDisplay ? ".5rem" : "0",
      }}
      className={`${classes[color]} ${classes[fontSize]} ${classes[fontWeight]}`}>
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

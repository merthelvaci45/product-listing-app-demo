import PropTypes from "prop-types";

import classes from "./Title.module.scss";

/**
 * this component constitutes a text wrapped by either <h2> or <h1> HTML element
 * @param {boolean} isSubTitle: prop to check whether the component is wrapped by <h2> or <h1> HTML element
 * @param {string} title: actual content of the component to be displayed
 */
const Title = ({ isSubTitle, title }) => {
  const TitleComponent = isSubTitle ? "h2" : "h1";
  return (
    <TitleComponent
      className={`${isSubTitle ? classes.SubTitle : classes.MainTitle}`}
    >
      {title}
    </TitleComponent>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  isSubTitle: PropTypes.bool,
};

Title.defaultProps = {
  isSubTitle: false,
};

export default Title;

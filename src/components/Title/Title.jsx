import PropTypes from "prop-types";

import classes from "./Title.module.scss";

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

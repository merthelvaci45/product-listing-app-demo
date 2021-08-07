import PropTypes from "prop-types";

import classes from "./FeatureCardWithTitle.module.scss";

import Title from "../Title";

const FeatureCardWithTitle = ({ children, isFixedHeight, title }) => {
  return (
    <>
      <Title isSubTitle title={title} />
      <div
        className={`${classes.FeatureCard} ${
          isFixedHeight ? classes.FixedHeight : ""
        }`}
      >
        {children}
      </div>
    </>
  );
};

FeatureCardWithTitle.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default FeatureCardWithTitle;

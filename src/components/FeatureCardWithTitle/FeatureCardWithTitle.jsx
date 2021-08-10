import PropTypes from "prop-types";

import classes from "./FeatureCardWithTitle.module.scss";

import Title from "../Title";

/**
 * this component consitutes a Card like structure with a specified title.
 * @param {Node} children: JSX node to be rendered as the whole content of the component
 * @param {boolean} isFixedHeight: prop to check if component height is fixed or not. if not,
 * the height will be adjusted according to the height of "children" prop JSX element.
 * @param {String} title: prop to set a specific title for the component
 */
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

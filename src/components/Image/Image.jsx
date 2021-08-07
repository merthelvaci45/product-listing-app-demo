import PropTypes from "prop-types";

import lazySizes from "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";

import classes from "./Image.module.scss";

lazySizes.loadMode = 1;

const Image = ({ imgAltText, imgFallbackSrc, imgWebpSrc, isSvg }) => {
  return (
    <figure className={classes.Figure}>
      <img
        className={classes.Image}
        data-src={imgFallbackSrc}
        data-srcset={isSvg ? null : imgWebpSrc}
        alt={imgAltText}
      />
    </figure>
  );
};

Image.propTypes = {
  imgAltText: PropTypes.string.isRequired,
  imgFallbackSrc: PropTypes.string.isRequired,
  imgWebpSrc: PropTypes.string,
  isSvg: PropTypes.bool,
};

Image.defaultProps = {
  imgWebpSrc: null,
  isSvg: false,
};

export default Image;

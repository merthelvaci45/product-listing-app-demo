import PropTypes from "prop-types";

import lazySizes from "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";

import classes from "./Image.module.scss";

lazySizes.loadMode = 1;

/**
 * this component renders an image with "lazyloading" feature provided by "lazysizes" package.
 * @param {String} imgAltText: alt text for <img> element for providing access for screen readers
 * @param {String} imgFallbackSrc: source path for an image with extension other than WebP
 * @param {String} imgWebpSrc: source path for an image with extension WebP
 * @param {boolean} isSvg: bool prop to check if an image is in svg format or not. if true, it means
 * that it will have no corresponding image with WebP format as svg images cannot be converted to WebP
 */
const Image = ({ imgAltText, imgFallbackSrc, imgWebpSrc, isSvg }) => {
  return (
    <figure className={classes.Figure}>
      <img
        className={`${classes.Image} lazyload`}
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

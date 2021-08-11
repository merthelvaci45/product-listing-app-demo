import classes from "./Logo.module.scss";

import { logoSvg } from "./util";

import { Image } from "..";

/**
 * this component renders the logo of the application in <Header> component
 */
const Logo = () => (
  <div className={classes.Logo}>
    <Image imgAltText={logoSvg.altText} imgFallbackSrc={logoSvg.source} isSvg />
  </div>
);

export default Logo;

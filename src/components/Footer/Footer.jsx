import classes from "./Footer.module.scss";

import Text from "../Text";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <Text fontSize="FontSize13" text="©2019 Market" />
      <Text fontSize="FontSize13" text="•" />
      <Text fontSize="FontSize13" text="Privacy Policy" />
    </footer>
  );
};

export default Footer;

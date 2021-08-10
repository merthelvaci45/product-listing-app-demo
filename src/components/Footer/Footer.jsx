import { createPortal } from "react-dom";

import classes from "./Footer.module.scss";

import { Text } from "..";

const Footer = () => {
  const footerNode = document.querySelector("#footer");
  const footerContent = (
    <footer className={classes.Footer}>
      <Text fontSize="FontSize13" text="©2019 Market" />
      <Text fontSize="FontSize13" text="•" />
      <Text fontSize="FontSize13" text="Privacy Policy" />
    </footer>
  );

  return createPortal(footerContent, footerNode);
};

export default Footer;

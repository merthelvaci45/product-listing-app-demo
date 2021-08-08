import classes from "./Spinner.module.scss";

/**
 * this component display a loading spinner whenever any data in any page/component
 * is being loaded.
 */
const Spinner = () => {
  return (
    <div role="none" className={classes.Spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;

import classes from "./Pagination.module.scss";

import FlatButton from "../../components/FlatButton";
import Text from "../../components/Text";

const Pagination = () => {
  return (
    <div className={classes.Pagination}>
      <FlatButton onPressed={() => {}}>
        <i className="fas fa-arrow-left"></i>
        <Text fontWeight="FontWeight600" text="Prev" />
      </FlatButton>
      <div className={classes.PageNumbers}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>...</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
      </div>
      <FlatButton onPressed={() => {}}>
        <Text fontWeight="FontWeight600" text="Next" />
        <i className="fas fa-arrow-right"></i>
      </FlatButton>
    </div>
  );
};

export default Pagination;

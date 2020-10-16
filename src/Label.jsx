import React from "react";
import "./SelectLabels.scss";
import CheckIcon from "@material-ui/icons/Check";

const Label = ({ color, activated, id, activatedCard }) => {
  return (
    <div
      className="selectedLabels__labelInList"
      style={{ backgroundColor: color }}
      onClick={() => activatedCard(id)}
    >
      {activated === true ? (
        <CheckIcon className="selectedLabels__check" />
      ) : null}
    </div>
  );
};

export default Label;

import React, { useContext } from "react";
import "./SelectLabels.scss";
import AddIcon from "@material-ui/icons/Add";
import { SelectedCardContext } from "./CardElementProvider";

const SelectLabels = () => {
  const [selectedCard, setSelectedCard] = useContext(SelectedCardContext);

  return (
    <div className="selectLabels">
      <h4>Labels</h4>
      <div className="selectLabels__labels">
          {selectedCard.labels.map((labels) => (
            <div className="selectLabels__label" style={{backgroundColor : labels}}></div>
          ))}

        <div className="selectLabels__addLabel">

          <AddIcon />
        </div>
      </div>
    </div>
  );
};

export default SelectLabels;

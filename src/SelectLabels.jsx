import React, { useContext, useState, useEffect } from "react";
import "./SelectLabels.scss";
import AddIcon from "@material-ui/icons/Add";
import { SelectedCardContext } from "./CardElementProvider";
import CheckIcon from "@material-ui/icons/Check";

const SelectLabels = () => {
  const [selectedCard, setSelectedCard] = useContext(SelectedCardContext);
  const [displayLabels, setDisplayLabels] = useState(false);

  const [colorLabel, setColorLabel] = useState([
    {
      color: "#60bd4e",
      activated: false,
    },
    {
      color: "#f2d600",
      activated: false,
    },
    {
      color: "#ff9e19",
      activated: false,
    },
    {
      color: "#eb5b46",
      activated: false,
    },
    {
      color: "#c377e0",
      activated: false,
    },
    {
      color: "#0179bf",
      activated: false,
    },
    {
        color: "#334663",
        activated: false,
      },
  ]);

  //Check if the selected card has the same color as the label list for checkmark
  useEffect(() => {
    for (let i = 0; i < colorLabel.length; i++) {
      for (let y = 0; y < selectedCard.labels.length; y++) {
        if (selectedCard.labels[y] === colorLabel[i].color) {
          setColorLabel([...colorLabel], (colorLabel[i].activated = true));
        }
      }
    }
  }, [selectedCard]);

  return (
    <div className="selectLabels">
      <h4>Labels</h4>
      <div className="selectLabels__labels">
        {selectedCard.labels.map((labels) => (
          <div
            className="selectLabels__label"
            style={{ backgroundColor: labels }}
          ></div>
        ))}

        <div className="selectLabels__labelSelection">
          <div
            className="selectLabels__addLabel"
            onClick={() => setDisplayLabels(!displayLabels)}
          >
            <AddIcon />
          </div>

          {/* Label list menu */}
          {displayLabels ? (
            <div className="selectLabels__labelList">
              <h4>Labels</h4>
              <hr />

              {colorLabel.map((elem) => (
                <div
                  className="selectedLabels__labelInList"
                  style={{ backgroundColor: elem.color }}
                  key={elem.color}
                >
                  {/* Check if label is activated or not */}
                  {elem.activated === true ? (
                    <CheckIcon className="selectedLabels__check" />
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SelectLabels;

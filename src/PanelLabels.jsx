import React, { useContext, useState, useEffect } from "react";
import "./SelectLabels.scss";
import AddIcon from "@material-ui/icons/Add";
import { SelectedCardContext } from "./CardElementProvider";
import Chip from "@material-ui/core/Chip";
import Label from "./Label";

import { IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const SelectLabels = () => {
  const [selectedCard, setSelectedCard] = useContext(SelectedCardContext);
  const [displayLabels, setDisplayLabels] = useState(false);

  const [colorLabel, setColorLabel] = useState([
    {
      id: 0,
      color: "#60bd4e",
      activated: false,
    },
    {
      id: 1,
      color: "#f2d600",
      activated: false,
    },
    {
      id: 2,
      color: "#ff9e19",
      activated: false,
    },
    {
      id: 3,
      color: "#eb5b46",
      activated: false,
    },
    {
      id: 4,
      color: "#c377e0",
      activated: false,
    },
    {
      id: 5,
      color: "#0179bf",
      activated: false,
    },
    {
      id: 6,
      color: "#334663",
      activated: false,
    },
  ]);

  const activateLabel = (id) => {
    if (colorLabel[id].activated === false) {
      setColorLabel([...colorLabel], (colorLabel[id].activated = true));
      selectedCard.labels.push(colorLabel[id].color);
    } else {
      setColorLabel([...colorLabel], (colorLabel[id].activated = false));
      selectedCard.labels.splice(
        selectedCard.labels.indexOf(colorLabel[id].color),
        1
      );
    }
  };

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
      <Typography >
        <Box fontWeight="fontWeightLight" color="text.secondary" fontSize="fontSize">Labels</Box>
      </Typography>
      <div className="selectLabels__labels">
        {selectedCard.labels.map((labels) => (
          <Chip
            size={"medium"}
            key={labels + labels.length}
            className="selectLabels__label"
            style={{ backgroundColor: labels }}
          />
        ))}

        <div className="selectLabels__labelSelection">
          <IconButton
            className="selectLabels__addLabel"
            onClick={() => setDisplayLabels(!displayLabels)}
          >
            <AddIcon />
          </IconButton>

          {/* Label list menu */}

          {displayLabels ? (
            <div className="selectLabels__labelList">
              <Typography variant="subtitle2">
                <Box fontWeight="fontWeightBold">Labels</Box>
              </Typography>
              <hr/>
              {colorLabel.map((elem) => (
                <Label
                  color={elem.color}
                  activated={elem.activated}
                  id={elem.id}
                  key={elem.id}
                  activatedCard={activateLabel}
                ></Label>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SelectLabels;

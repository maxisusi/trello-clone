import React, { useContext, useState, useEffect } from "react";
import "./SelectLabels.scss";
import AddIcon from "@material-ui/icons/Add";
import { SelectedCardContext } from "./CardElementProvider";
import Chip from "@material-ui/core/Chip";
import Label from "./Label";

import { IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


import List from "@material-ui/core/List";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const SelectLabels = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    // setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedCard, setSelectedCard] = useContext(SelectedCardContext);

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
    if (colorLabel[id]?.activated === false) {
      setColorLabel([...colorLabel], (colorLabel[id].activated = true));
        
      selectedCard.labels.push(colorLabel[id].color);
    } else if (colorLabel[id]?.activated === true) {
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
      <Typography>
        <Box
          fontWeight="fontWeightLight"
          color="text.secondary"
          fontSize="fontSize"
        >
          Labels
        </Box>
      </Typography>
      {selectedCard.labels.map((labels) => (
        <Chip
          size={"medium"}
          key={labels + labels.length}
          style={{ backgroundColor: labels }}
          className="selectedLabels__label"
        />
      ))}
      <IconButton
        className="selectLabels__addLabel"
        onClick={handleClickListItem}
      >
        <AddIcon />
      </IconButton>

      <List component="nav" aria-label="Device settings"></List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {colorLabel.map((option, index) => (
          <MenuItem
            key={option}
            // selected={index === selectedIndex}
            onClick={(event) => {
              handleMenuItemClick(event, index);
              activateLabel(option.id);
            }}
            style={{
              backgroundColor: option.color,
              width: "120px",
              height: "35px",
              marginBottom: "5px",
              position: "relative",
              color: "white",
            }}
          >
            <Label
              activated={option.activated}
              activatedCard={activateLabel}
            ></Label>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SelectLabels;

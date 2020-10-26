import React, { useState, useEffect, useContext } from "react";
import "./Cards.scss";

import CreateIcon from "@material-ui/icons/Create";
import { IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import Chip from "@material-ui/core/Chip";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";


const CardsElement = ({
  id,
  title,
  labels,
  displayCard,
  checklist,
  description,
  deleteCard,
}) => {
  //#region MaterialUI menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [onHover, setOnHover] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //#endregion

  const openMenu = () => {
    if (!anchorEl) {
      displayCard(id, title, labels, description, checklist);
    }
  };

  //Main card elements



  return (
    <div>
      <div className="cards__element" onClick={openMenu}>
        <div className="cards__labels">
          {labels?.map((colors) => (
            <div>
              <div
                key={id + colors}
                className="cards__label"
                style={{ backgroundColor: colors }}
              ></div>
            </div>
          ))}
        </div>

        <p>{title}</p>
        <div className="cards__downElements">
          <Chip
            label="11/11"
            color="green"
            icon={<LibraryAddCheckIcon />}
            size="small"
          />
          <IconButton
            size={"small"}
            className="cards__pen"
            aria-controls="fade-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <CreateIcon fontSize={"small"} />
          </IconButton>
        </div>

        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              deleteCard(id);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default CardsElement;

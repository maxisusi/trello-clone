import React, { useState, useEffect, useContext } from "react";
import "./Cards.scss";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import CreateIcon from "@material-ui/icons/Create";
import { IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import Chip from "@material-ui/core/Chip";
import Box from '@material-ui/core/Box';
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";

import { CardElementContext } from "./CardElementProvider";
import Typography from "@material-ui/core/Typography";

const CardsElement = ({
  id,
  title,
  labels,
  displayCard,
  checklist,
  description,
  deleteCard,
  innerRef,
  provided,
}) => {
  const [cardElement, setCardElement] = useContext(CardElementContext);
  const [cardCompleted, setCardCompleted] = useState("default");

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

  let checklistRemainingElement = 0;
  checklist.filter((elem) => {
    if (elem.done == true) checklistRemainingElement++;
  });

  useEffect(() => {
    if (checklistRemainingElement == checklist.length)
      setCardCompleted("primary");
    else setCardCompleted("default");
  }, [cardElement]);

  //Main card elements

  return (
    <Card
      className="cards__element"

      onClick={openMenu}
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <CardContent style={{ padding: "0.5em 1em 0.5em 1em",}}>
        {labels ? (
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
        ) : null}

        {checklist.length == 0 ? (
          <Grid
            container
            justify="space-between"
            className="cards__downElements"
          >
            <Typography ><Box fontSize={14.3}>{title}</Box></Typography>
            <IconButton
              size={"small"}
              className="cards__pen"
              aria-controls="fade-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <CreateIcon fontSize={"small"} />
            </IconButton>
          </Grid>
        ) : (
          <>
            <Typography ><Box fontSize={14.3}>{title}</Box></Typography>
            <Grid
              container
              justify="space-between"
              className="cards__downElements withElements"
            >
              <Chip
                label={`${checklistRemainingElement}/${checklist.length}`}
                style={{borderColor: "white"}}
                variant="outlined"
                color={cardCompleted}
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
            </Grid>
          </>
        )}

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
      </CardContent>
    </Card>
  );
};

export default CardsElement;

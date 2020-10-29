import React, { useContext, useEffect, useState } from "react";
import "./Panels.scss";

import {
  CardElementContext,
  DisplayPanelContext,

  CardIDContext,
  ID,
} from "./CardElementProvider";

import ClearIcon from "@material-ui/icons/Clear";

import AddIcon from "@material-ui/icons/Add";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import PanelLabels from "./PanelLabels";
import ChecklistElement from "./ChecklistElement";
import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import PanelDescription from "./PanelDescription";
import PanelHeader from "./PanelHeader";
import PanelDeadline from "./PanelDeadline";

const Panel = () => {
  const [displayPanel, setDisplayPanel] = useContext(DisplayPanelContext);
  const [addChecklistMenu, setAddChecklistMenu] = useState(false);
  const [checkListInput, setCheckListInput] = useState("");
  const [remainingChecklist, setRemainingChecklist] = useState(0);

  //Main card elements
  const [cardElement, setCardElement] = useContext(CardElementContext);

  //Current card selected
  const [cardId, setCardId] = useContext(CardIDContext);

  console.log(cardId);

  //#endregion

  //#region Add todo element
  const addTodo = (e) => {
    e.preventDefault();

    console.log(addChecklistMenu);
    const newTodo = {
      id: ID(),
      title: checkListInput,
      done: false,
    };

    setCardElement(
      [...cardElement],
      cardElement[cardId]?.checklist.push(newTodo)
    );
    setAddChecklistMenu(false);
  };

  //#endregion

  //#region Change checlist elem based on the checklist
  const handleChecklistChange = (checkElement, id) => {
    setCardElement(
      [...cardElement],
      cardElement[cardId]?.checklist.map((element) =>
        element.id === id ? (element.done = !checkElement) : null
      )
    );
  };

  const deleteChecklistElement = (id) => {
    const indexOfId = [...cardElement[cardId].checklist].findIndex(
      (obj) => obj.id === id
    );

    setCardElement(
      [...cardElement],
      cardElement[cardId]?.checklist.splice(indexOfId, 1)
    );
  };

  // get the percentage of remaining checklist
  useEffect(() => {
    if (cardElement[cardId]?.checklist) {
      const totalChecklist = cardElement[cardId].checklist.length;
      let checkedCount = 0;

      const getCheckedCount = cardElement[cardId].checklist.forEach(
        (element) => {
          if (element.done === true) checkedCount += 1;
        }
      );

      setRemainingChecklist(((checkedCount / totalChecklist) * 100).toFixed());
    } else return;
  }, [cardId, cardElement]);

  //#endregion

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
  });

  return (
    <div className="panel">
      <div className="panel__form">
        {/* Header of the panel */}
        <PanelHeader cardId={cardId} />

        {/* Selected labels */}

        <Grid container justify="space-between">
          <PanelLabels />
          {/* <PanelDeadline /> */}
        </Grid>

        {/* Description */}

        <PanelDescription cardId={cardId} />

        {/* Checklist */}

        <div className="panel__toDo">
          <div className="panel__descriptionHeader">
            <PlaylistAddCheckIcon className="panel__icon"></PlaylistAddCheckIcon>
            <Typography variant="h6">
              <Box fontWeight="fontWeightBold">Checklist</Box>
            </Typography>
          </div>

          {cardElement[cardId]?.checklist.length == 0 ? null : (
            <LinearProgressWithLabel value={remainingChecklist} />
          )}

          {/* Display checklist point */}

          {cardElement[cardId]?.checklist
            ? cardElement[cardId].checklist.map((element) => (
                <ChecklistElement
                  title={element.title}
                  done={element.done}
                  key={element.id}
                  id={element.id}
                  handleChecklistChange={handleChecklistChange}
                  deleteChecklistElement={deleteChecklistElement}
                  className="panel__checklist"
                />
              ))
            : null}

          {/* Add elements to the checklist */}

          <div className="panel__checklistAddElement">
            {addChecklistMenu ? (
              <form
                onSubmit={(e) => addTodo(e)}
                className="panel__checklistMenu"
              >
                <TextField
                  onChange={(e) => setCheckListInput(e.target.value)}
                  variant="outlined"
                  autoFocus={true}
                  label="Add to checklist"
                  className="panel__checklistFill"
                  fullWidth={true}
                ></TextField>

                <ButtonGroup>
                  <Button
                    startIcon={<AddIcon />}
                    color="primary"
                    variant="contained"
                    onClick={addTodo}
                  >
                    Save
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setAddChecklistMenu(false)}
                    startIcon={<ClearIcon />}
                  >
                    Remove
                  </Button>
                </ButtonGroup>
              </form>
            ) : (
              <Button
                variant="contained"
                onClick={() => setAddChecklistMenu(!addChecklistMenu)}
              >
                Add checklist
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;

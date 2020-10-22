import React, { useContext, useEffect, useState } from "react";
import "./Panels.scss";
import {
  CardElementContext,
  DisplayPanelContext,
  SelectedCardContext,
  ID,
} from "./CardElementProvider";

import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import ClearIcon from "@material-ui/icons/Clear";
import SubjectIcon from "@material-ui/icons/Subject";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import SelectLabels from "./SelectLabels";
import Checklist from "./Checklist";
import { Button, IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const Panel = () => {
  const [displayPanel, setDisplayPanel] = useContext(DisplayPanelContext);
  const [addChecklistMenu, setAddChecklistMenu] = useState(false);
  const [checkListInput, setCheckListInput] = useState("");
  const [remainingChecklist, setRemainingChecklist] = useState(0);

  //Main card elements
  const [cardElement, setCardElement] = useContext(CardElementContext);

  //Current card selected
  const [selectedCard, setSelectedCard] = useContext(SelectedCardContext);

  //#region Get ID of the current selected card
  const [cardId, setCardId] = useState(null);

  useEffect(() => {
    for (let i = 0; i < cardElement.length; i++) {
      if (cardElement[i].id === selectedCard.id) {
        setCardId(i);
        return;
      }
    }
  }, [selectedCard]);

  //#endregion

  const changeDescription = (e) => {
    setCardElement([...cardElement], (cardElement[cardId].description = e));
  };

  const changeTitle = (e) => {
    setCardElement([...cardElement], (cardElement[cardId].title = e));
  };

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
      cardElement[cardId].checklist.push(newTodo)
    );
    setAddChecklistMenu(false);
  };

  //#endregion

  //#region Change checlist elem based on the checklist
  const handleChecklistChange = (checkElement, id) => {
    setCardElement(
      [...cardElement],
      cardElement[cardId].checklist.map((element) =>
        element.id === id ? (element.done = !checkElement) : null
      )
    );
  };

  useEffect(() => {
    if (selectedCard.checklist) {
      const totalChecklist = selectedCard.checklist.length;
      let checkedCount = 0;

      const getCheckedCount = selectedCard.checklist.forEach((element) => {
        if (element.done === true) checkedCount += 1;
      });

      console.log(checkedCount);

      setRemainingChecklist(((checkedCount / totalChecklist) * 100).toFixed());
    } else return;
  }, [selectedCard, cardElement]);

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

  if (displayPanel) {
    return (
      <div className="panel">
        <div
          className="panel__blackBackground"
          onClick={() => setDisplayPanel(false)}
        ></div>

        <div className="panel__form">
          {/* Header of the panel */}
          <div className="panel__header">
            <div className="panel__headerLeft">
              <ViewAgendaIcon className="panel__icon"></ViewAgendaIcon>
              <input
                className="panel__textInput"
                placeholder="Add title"
                defaultValue={selectedCard.title}
                onChange={(e) => changeTitle(e.target.value)}
              />
            </div>
            <ClearIcon
              className="panel__close"
              onClick={() => setDisplayPanel(false)}
            />
          </div>

          {/* Selected labels */}

          <SelectLabels></SelectLabels>

          {/* Description */}

          <div className="panel__description">
            <div className="panel__descriptionHeader">
              <SubjectIcon className="panel__icon"></SubjectIcon>
              <h3>Description</h3>
            </div>

            <textarea
              className="panel__textDescription"
              placeholder="Add a more detailed description"
              defaultValue={selectedCard.description}
              onChange={(e) => changeDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Checklist */}

          <div className="panel__toDo">
            <div className="panel__descriptionHeader">
              <PlaylistAddCheckIcon className="panel__icon"></PlaylistAddCheckIcon>
              <h3>Checklist</h3>
            </div>

            {selectedCard.checklist.length == 0 ? (
              null
            ) : (<LinearProgressWithLabel value={remainingChecklist} />)}

            {/* Display checklist point */}

            {selectedCard.checklist
              ? selectedCard.checklist.map((element) => (
                  <Checklist
                    title={element.title}
                    done={element.done}
                    key={element.id}
                    id={element.id}
                    handleChecklistChange={handleChecklistChange}
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
                    label="Add to checklist"
                    className="panel__checklistFill"
                  ></TextField>
                  <div className="panel__checklistConfirmation">
                    <Button
                      className="panel__checklistConfirmationSave"
                      variant="contained"
                      onClick={addTodo}
                    >
                      Save
                    </Button>
                    <IconButton>
                      <ClearIcon
                        className="panel__checklistConfirmationUnsave"
                        onClick={() => setAddChecklistMenu(false)}
                      ></ClearIcon>
                    </IconButton>
                  </div>
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
  } else {
    return null;
  }
};

export default Panel;

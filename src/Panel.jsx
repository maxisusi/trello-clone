import React, { useContext, useEffect, useState } from "react";
import "./Panels.scss";
import {
  CardElementContext,
  DisplayPanelContext,
  SelectedCardContext,
} from "./CardElementProvider";

import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import ClearIcon from "@material-ui/icons/Clear";
import SubjectIcon from "@material-ui/icons/Subject";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import SelectLabels from "./SelectLabels";
import Checklist from "./Checklist";
import { Button, IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const Panel = () => {
  const [displayPanel, setDisplayPanel] = useContext(DisplayPanelContext);
  const [addChecklistMenu, setAddChecklistMenu] = useState(false);
  const [checkListInput, setCheckListInput] = useState('');
  const [cardElement, setCardElement] = useContext(CardElementContext);
  const [selectedCard, setSelectedCard] = useContext(SelectedCardContext);
  const [cardId, setCardId] = useState(null);

  console.log(checkListInput);

  useEffect(() => {
    for (let i = 0; i < cardElement.length; i++) {
      if (cardElement[i].id === selectedCard.id) {
        setCardId(i);
        return;
      }
    }
  }, [selectedCard]);

  const changeDescription = (e) => {
    setCardElement([...cardElement], (cardElement[cardId].description = e));
  };

  const changeTitle = (e) => {
    setCardElement([...cardElement], (cardElement[cardId].title = e));
  };

  const addTodo = (e) => {
    e.preventDefault();


      if(addChecklistMenu === '') {
        console.log('No input');
        return;
      }
      else {
        console.log(addChecklistMenu);
        const newTodo = {
          done: false,
          title: checkListInput,
        };
  
        setCardElement(
          [...cardElement],
          cardElement[cardId].checklist.push(newTodo)
        );
        setAddChecklistMenu(false);
      }


    
  };

  if (displayPanel) {
    return (
      <div className="panel">
        <div
          className="panel__blackBackground"
          onClick={() => setDisplayPanel(false)}
        ></div>

        <div className="panel__form">
          {/* Header */}
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

          <div className="panel__toDo">
            <div className="panel__descriptionHeader">
              <PlaylistAddCheckIcon className="panel__icon"></PlaylistAddCheckIcon>
              <h3>Checklist</h3>
            </div>

            {selectedCard.checklist
              ? selectedCard.checklist.map((element) => (
                  <Checklist
                    title={element.title}
                    done={element.done}
                    className="panel__checklist"
                  />
                ))
              : null}

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

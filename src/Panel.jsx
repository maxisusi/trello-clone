import React, { useContext } from "react";
import "./Panels.scss";
import {
  CardElementContext,
  DisplayPanelContext,
  SelectedCardContext,
} from "./CardElementProvider";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import ClearIcon from "@material-ui/icons/Clear";
import SubjectIcon from "@material-ui/icons/Subject";

const Panel = () => {
  const [displayPanel, setDisplayPanel] = useContext(DisplayPanelContext);
  const [cardElement, setCardElement] = useContext(CardElementContext);
  const [selectedCard, setSelectedCard] = useContext(SelectedCardContext);

  const changeDescription = (e) => {
    setCardElement([...cardElement], cardElement[selectedCard.id].description = e)
  }

  const changeTitle = (e) => {
    setCardElement([...cardElement], cardElement[selectedCard.id].title = e)
  }

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
                placeholder="Title"
                defaultValue={selectedCard.title}
                onChange={(e) => changeTitle(e.target.value)}
              />
            </div>
            <ClearIcon
              className="panel__close"
              onClick={() => setDisplayPanel(false)}
            />
          </div>

          {/* Description */}

          <div className="panel__description">
            <div className="panel__descriptionHeader">
              <SubjectIcon className="panel__icon"></SubjectIcon>
              <h3>Description</h3>
            </div>

            <textarea className="panel__textDescription" defaultValue={selectedCard.description} onChange={(e) => changeDescription(e.target.value)}>
            </textarea>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Panel;

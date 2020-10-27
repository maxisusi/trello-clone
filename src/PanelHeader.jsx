import React, { useContext } from "react";
import {
  CardElementContext,
  DisplayPanelContext,
  SelectedCardContext,
} from "./CardElementProvider";

import { IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";


import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import ClearIcon from "@material-ui/icons/Clear";

const PanelHeader = ({ cardId }) => {
    
  const [selectedCard, setSelectedCard] = useContext(SelectedCardContext);
  const [displayPanel, setDisplayPanel] = useContext(DisplayPanelContext);
  const [cardElement, setCardElement] = useContext(CardElementContext);

  const changeTitle = (e) => {
    setCardElement([...cardElement], (cardElement[cardId].title = e));
  };

  return (
    <div className="panel__header">
      <div className="panel__headerLeft">
        <ViewAgendaIcon className="panel__icon"></ViewAgendaIcon>
        <TextField
          fullWidth={true}
          size={"medium"}
          placeholder="Add title"
          defaultValue={selectedCard.title}
          onChange={(e) => changeTitle(e.target.value)}
        />
      </div>
      <IconButton>
        <ClearIcon
          className="panel__close"
          onClick={() => setDisplayPanel(false)}
        />
      </IconButton>
    </div>
  );
};

export default PanelHeader;

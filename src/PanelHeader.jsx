import React, { useContext } from "react";
import {
  CardElementContext,
} from "./CardElementProvider";

import TextField from "@material-ui/core/TextField";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";

const PanelHeader = ({ cardId }) => {
    
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
          defaultValue={cardElement[cardId].title}
          onChange={(e) => changeTitle(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PanelHeader;

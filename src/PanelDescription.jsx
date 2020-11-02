import React, { useContext } from "react";

import {
  CardElementContext,
} from "./CardElementProvider";

import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import TextField from "@material-ui/core/TextField";
import SubjectIcon from "@material-ui/icons/Subject";

const PanelDescription = ({ cardId }) => {
  const changeDescription = (e) => {
    setCardElement([...cardElement], (cardElement[cardId].description = e));
  };

  //Main card elements
  const [cardElement, setCardElement] = useContext(CardElementContext);
  return (
    <div className="panel__description">
      <div className="panel__descriptionHeader">
        <SubjectIcon className="panel__icon"></SubjectIcon>
        <Typography variant="h6"><Box fontWeight="fontWeightBold">Description</Box></Typography>
      </div>

      <TextField
        className="panel__textDescription"
        fullWidth={true}
        label="Multiline"
        variant="outlined"
        multiline
        rows={4}
        label="Add a more detailed description"
        defaultValue={cardElement[cardId].description}
        onChange={(e) => changeDescription(e.target.value)}
      ></TextField>
    </div>
  );
};

export default PanelDescription;

import React, { useContext } from "react";
import "./Panels.scss";

import { CardIDContext } from "./CardElementProvider";

import PanelLabels from "./PanelLabels";

import PanelDescription from "./PanelDescription";
import PanelHeader from "./PanelHeader";
import PanelChecklist from "./PanelChecklist";

const Panel = () => {
  //Current card selected
  const [cardId, setCardId] = useContext(CardIDContext);
  //#endregion

  return (
    <div className="panel">
      <div className="panel__form">
        {/* Header of the panel */}
        <PanelHeader cardId={cardId} />
        {/* Selected labels */}
        <PanelLabels />
        {/* Description */}
        <PanelDescription cardId={cardId} />
        {/* Checklist */}
        <PanelChecklist />
      </div>
    </div>
  );
};

export default Panel;

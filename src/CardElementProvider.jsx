import { render } from "@testing-library/react";
import React, { createContext, useState } from "react";
import Cards from "./Cards";
import Panel from "./Panel";

export const CardElementContext = createContext();
export const DisplayPanelContext = createContext();
export const SelectedCardContext = createContext();

export const CardElementProvider = () => {
  const [displayPanel, setDisplayPanel] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    id: '',
    title: '',
    labels: null,
    description: ''
  });

  const ID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const [cardElement, setCardElement] = useState([
    {
      id: ID(),
      title: "Have fun",
      labels: ["#ff9e19", "#60bd4e", "#0179bf"],
      description: "It's important to have fun",
    },
    {
      id: ID(),
      title: "Test my limits",
      labels: ["#ff9e19", "#60bd4e"],
      description: "You should always push the envelop",
    },
    {
      id: ID(),
      title: "Say hello to my mum",
      labels: ["#ff9e19", "#60bd4e", "#0179bf"],
      description: "Because you love your mum",
    },
  ]);

  return (
    <CardElementContext.Provider value={[cardElement, setCardElement]}>
      <DisplayPanelContext.Provider value={[displayPanel, setDisplayPanel]}>
        <SelectedCardContext.Provider value={[selectedCard, setSelectedCard]}>
          <Panel />
          <Cards />
        </SelectedCardContext.Provider>
      </DisplayPanelContext.Provider>
    </CardElementContext.Provider>
  );
};

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


  const [cardElement, setCardElement] = useState([
    {
      id: 0,
      title: "Have fun",
      labels: ["#ff9e19", "#60bd4e", "#0179bf"],
      description: "It's important to have fun",
    },
    {
      id: 1,
      title: "Test my limits",
      labels: ["#ff9e19", "#60bd4e"],
      description: "You should always push the envelop",
    },
    {
      id: 2,
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

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
      labels: ["#F69F1C", "#61BD50", "#2F79BF"],
      description: "It's important to have fun",
    },
    {
      id: 1,
      title: "Test my limits",
      labels: ["#F69F1C", "#61BD50"],
      description: "You should always push the envelop",
    },
    {
      id: 2,
      title: "Say hello to my mum",
      labels: ["#F69F1C", "#61BD50", "#2F79BF"],
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

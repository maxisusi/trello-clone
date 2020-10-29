import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
import { render } from "@testing-library/react";
import React, { createContext, useState, useEffect } from "react";
import Cards from "./Cards";
import Panel from "./Panel";

export const CardElementContext = createContext();
export const DisplayPanelContext = createContext();
export const SelectedCardContext = createContext();
export const CardIDContext = createContext();

export const ID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const CardElementProvider = () => {
  const [displayPanel, setDisplayPanel] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    id: "",
  });

  //#region Get ID of the current selected card
  const [cardId, setCardId] = useState(null);
  useEffect(() => {
    for (let i = 0; i < cardElement.length; i++) {
      if (cardElement[i].id === selectedCard.id) {
        console.log(i);
        setCardId(i);
        return;
      }
    }
  }, [selectedCard]);

  const [cardElement, setCardElement] = useState([
    {
      id: ID(),
      title: "Have fun",
      labels: ["#ff9e19", "#60bd4e", "#0179bf"],
      description: "It's important to have fun",
      dueDate: new Date(),
      checklist: [
        {
          id: ID(),
          title: "Create datasheet",
          done: true,
        },
        {
          id: ID(),
          title: "Make sure you cook enough pasta",
          done: true,
        },
        {
          id: ID(),
          title: "Have sex as much as possible",
          done: true,
        },
      ],
    },
    {
      id: ID(),
      title: "Test my limits",
      labels: ["#ff9e19", "#60bd4e"],
      description: "You should always push the envelop",
      dueDate: new Date(),
      checklist: [
        {
          id: ID(),
          title: "Drink coffea",
          done: true,
        },
        {
          id: ID(),
          title: "Buy a new lambo",
          done: false,
        },
      ],
    },
    {
      id: ID(),
      title: "Say hello to my mum",
      labels: ["#ff9e19", "#60bd4e", "#0179bf"],
      description: "Because you love your mum",
      checklist: [
        {
          id: ID(),
          title: "Say hi to girlfriend",
          done: true,
        },
        {
          id: ID(),
          title: "Go ski",
          done: false,
        },
        {
          id: ID(),
          title: "Repear the dishwaser",
          done: false,
        },
      ],
    },
  ]);

  return (
    <CardElementContext.Provider value={[cardElement, setCardElement]}>
      <DisplayPanelContext.Provider value={[displayPanel, setDisplayPanel]}>
        <SelectedCardContext.Provider value={[selectedCard, setSelectedCard]}>
          <CardIDContext.Provider value={[cardId, setCardId]}>
            <Cards />
          </CardIDContext.Provider>
        </SelectedCardContext.Provider>
      </DisplayPanelContext.Provider>
    </CardElementContext.Provider>
  );
};

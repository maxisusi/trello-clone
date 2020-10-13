import React from "react";
import "./Cards.scss";

const CardsElement = ({ id, title, labels, displayCard, description }) => {
  return (
    <div className="cards__element" onClick={() => displayCard(id, title, labels, description)}>
      <div className="cards__labels">
        {labels?.map((colors) => (
          <div
            key={id + colors}
            className="cards__label"
            style={{ backgroundColor: colors }}
          ></div>
        ))}
      </div>

      <p>{title}</p>
    </div>
  );
};

export default CardsElement;

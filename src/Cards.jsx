import React, { useState, useContext } from "react";
import "./Cards.scss";

import CardsElement from "./CardsElement";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

import {
  CardElementContext,
  DisplayPanelContext,
  SelectedCardContext,
} from "./CardElementProvider";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const Cards = () => {
  const [cardTitle, setCardTitle] = useState("LSVD 🎹");
  const [createCard, setCreateCard] = useState(false);
  const [cardInput, setCardInput] = useState("");

  const [cardElement, setCardElement] = useContext(CardElementContext);
  const [displayPanel, setDisplayPanel] = useContext(DisplayPanelContext);
  const [selectedCard, setSelectedCard] = useContext(SelectedCardContext);


  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  const ID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const addCard = (e) => {
    setCreateCard(false);
    const addTo = {
      id: ID(),
      title: cardInput,
      labels: ["#334663"],
      description: "",
      checklist: [],
    };

    const newCard = [...cardElement, addTo];
    setCardElement(newCard);
    setCardInput("");
  };

  const displayCard = (id, title, labels, description, checklist) => {
    setDisplayPanel(true);
    setSelectedCard({
      id: id,
      title: title,
      labels: labels,
      description: description,
      checklist: checklist,
    });
  };

  const deleteCard = (id) => {
    console.log("deleting card id:", id);
    setCardElement(cardElement.filter((item) => item.id !== id));
  };

  return (
    <Card className="cards" variant="outlined">
      <CardContent>
        <div className="cards__header">
          <input className="cards__title" defaultValue={cardTitle}></input>
          <div className="cards__moreButton">
            <MoreHorizIcon />
          </div>
        </div>

        {/* All the displayed card */}
        <div className="cards__wrapper">
          {cardElement?.map((element) => (
            <CardsElement
              key={element.id}
              id={element.id}
              title={element.title}
              labels={element.labels}
              description={element.description}
              checklist={element.checklist}
              displayCard={displayCard}
              deleteCard={deleteCard}
              onClick={handleOpen}
            />
          ))}
        </div>

        {/* Create card module */}

        {createCard === true ? (
          <form onSubmit={(e) => addCard(e)}>
            <TextField
              className="cards__textInput"
              fullWidth={true}
              autoFocus={true}
              variant="outlined"
              label="Fill up your card"
              onChange={(e) => {
                setCardInput(e.target.value);
              }}
            ></TextField>

            <ButtonGroup fullWidth={true}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => addCard()}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => setCreateCard(!createCard)}
              >
                Remove
              </Button>
            </ButtonGroup>
          </form>
        ) : (
          <Button
            startIcon={<AddIcon />}
            fullWidth={true}
            textAlign="left"
            onClick={() => setCreateCard(!createCard)}
          >
            Add another card
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Cards;

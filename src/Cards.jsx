import React, { useState, useContext } from "react";
import "./Cards.scss";

import CardsElement from "./CardsElement";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  CardElementContext,
  DisplayPanelContext,
  SelectedCardContext,
} from "./CardElementProvider";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Panel from "./Panel";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    overflow:'scroll',
    height:'100%',
    display:'block'
    

  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    outline: "none",
    border: "2px",
    boxShadow: theme.shadows[5],
  },
}));

const Cards = () => {
  const [cardTitle, setCardTitle] = useState("LSVD 🎹");
  const [createCard, setCreateCard] = useState(false);
  const [cardInput, setCardInput] = useState("");

  const [cardElement, setCardElement] = useContext(CardElementContext);
  const [displayPanel, setDisplayPanel] = useContext(DisplayPanelContext);
  const [selectedCard, setSelectedCard] = useContext(SelectedCardContext);


  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {displayPanel ? <Panel /> : null}
    </div>
  );

  const ID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const addCard = (e) => {
    setCreateCard(false);
    const addTo = {
      id: ID(),
      title: cardInput,
      labels: [],
      description: "",
      checklist: [],
    };

    const newCard = [...cardElement, addTo];
    setCardElement(newCard);
    setCardInput("");
  };

  const displayCard = (id, title, labels, description, checklist) => {
    setDisplayPanel(true);
    handleOpen();
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

  const handleOnDragEnd = (result) => {
    const items = Array.from(cardElement);
    const [reordoredItem] = items.splice(result.source.index, 1);
    items.splice(result.destination?.index, 0, reordoredItem);

    setCardElement(items);
  };

  return (
    <Card className="cards" variant="outlined">
      <CardContent style={{ padding: "0.5em" }}>
        <Grid container justify="space-between" className="cards__header">
          <input className="cards__title" defaultValue={cardTitle}></input>
          <div className="cards__moreButton">
            <MoreHorizIcon />
          </div>
        </Grid>

        <Modal open={open} onClose={handleClose}>
          {body}
        </Modal>

        {/* All the displayed card */}

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="cards">
            {(provided) => (
              <div
                className="cards__wrapper"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {cardElement?.map((element, index) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id}
                    index={index}
                  >
                    {(provided) => (
                      <CardsElement
                        provided={provided}
                        innerRef={provided.innerRef}
                        id={element.id}
                        title={element.title}
                        labels={element.labels}
                        description={element.description}
                        checklist={element.checklist}
                        displayCard={displayCard}
                        deleteCard={deleteCard}
                      />
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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

import React, { useState, useEffect } from "react";
import "./Checklist.scss";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";


//Menu element
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

const Checklist = ({ title, done, id, handleChecklistChange, deleteChecklistElement }) => {
  //#region MaterialUI menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [onHover, setOnHover] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //#endregion

  const [checkElement, setCheckElement] = useState(false);

  useEffect(() =>  {
    setCheckElement(done);
  }, [Checklist]);

  const handleChange = (e) => {
    setCheckElement(!checkElement);
    handleChecklistChange(checkElement, id);
  };

  return (
    <div className="checklist">
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => handleChange(e)}
            checked={checkElement}
            name={title}
          />
        }
        label={title}
      />
      <IconButton
        className="cards__pen"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            deleteChecklistElement(id);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Checklist;

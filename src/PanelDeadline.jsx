import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const PanelDeadline = () => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Typography>
        <Box
          fontWeight="fontWeightLight"
          color="text.secondary"
          fontSize="fontSize"
        >
          Due date
        </Box>
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default PanelDeadline;

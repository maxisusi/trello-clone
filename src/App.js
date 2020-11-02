import React, { useContext } from "react";
import "./App.scss";
import { CardElementProvider } from "./CardElementProvider";
import Cards from "./Cards";
import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <div className="App">
      <CardElementProvider>
        <Grid container>
          <Cards></Cards>
        </Grid>
      </CardElementProvider>
    </div>
  );
}

export default App;

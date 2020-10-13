import React, { useContext } from "react";
import "./App.scss";
import { CardElementProvider } from "./CardElementProvider";
import Cards from "./Cards";
import Panel from "./Panel";

function App() {
  return (
    <div className="App">
      <CardElementProvider>
        <Panel></Panel>
        <Cards></Cards>
      </CardElementProvider>
    </div>
  );
}

export default App;

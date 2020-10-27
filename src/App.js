import React, { useContext } from "react";
import "./App.scss";
import { CardElementProvider } from "./CardElementProvider";
import Cards from "./Cards";


function App() {
  return (
    <div className="App">
      <CardElementProvider >
        
        <Cards></Cards>
      </CardElementProvider>
    </div>
  );
}

export default App;

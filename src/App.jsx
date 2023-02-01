import React from "react";

import { RowsContainer } from "./components/RowsContainer/RowsContainer";
import "./App.css";

const App = () => (
  <div className="App" style={{ height: "100%", width: "100%" }}>
    <div style={{ padding: "2em" }}>
      <RowsContainer />
    </div>
  </div>
);

export default App;

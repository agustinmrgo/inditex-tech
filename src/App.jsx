import React from "react";

import { initializeLocalStorageItem } from "./utils/helpers";
import { RowsContainer } from "./components/RowsContainer/RowsContainer";
import { products, initialRows } from "./utils/mockData";
import "./App.css";

const App = () => {
  initializeLocalStorageItem("products", products);
  initializeLocalStorageItem("rows", initialRows);

  return (
    <div className="App">
      <div style={{ padding: "2em" }}>
        <RowsContainer />
      </div>
    </div>
  );
};

export default App;

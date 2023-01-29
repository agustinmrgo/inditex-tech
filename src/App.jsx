import { useState } from "react";

import { RowsContainer } from "./components/RowsContainer/RowsContainer";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <RowsContainer />
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  );
}

export default App;

import { useState } from "react";
import Login from "./Login";
import Game from "./Game";
import "./App.css";

function App() {
  const [player, setPlayer] = useState(null);

  return (
    <div>
      {!player ? (
        <Login onLogin={setPlayer} />
      ) : (
        <Game player={player} setPlayer={setPlayer} />
      )}
    </div>
  );
}

export default App;
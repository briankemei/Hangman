import { useEffect, useState } from "react";
import HangmanImage from "./HangmanDisplay";
import WordDisplay from "./WordDisplay";
import LetterButtons from "./LetterSelector";
import GameStatusModal from "./GameStatus";
import NewGameButton from "./NewGameButton";

const WORDS = ["REACT", "DOCKER", "JAVASCRIPT", "COMPONENT", "PROGRAM"];
const API_BASE_URL = "http://localhost:4000/api/players";

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
}

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);

  const [playerNameInput, setPlayerNameInput] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [statsUpdated, setStatsUpdated] = useState(false);

  const maxMistakes = 5;

  async function handleLogin() {
    const trimmedName = playerNameInput.trim();

    if (!trimmedName) {
      setLoginError("Please enter your name");
      return;
    }

    try {
      setLoginError("");

      const getResponse = await fetch(`${API_BASE_URL}/${trimmedName}`);

      if (getResponse.ok) {
        const existingPlayer = await getResponse.json();
        setCurrentPlayer(existingPlayer);
        setIsLoggedIn(true);
        return;
      }

      if (getResponse.status === 404) {
        const postResponse = await fetch(API_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: trimmedName }),
        });

        if (!postResponse.ok) {
          throw new Error("Failed to create player");
        }

        const newPlayer = await postResponse.json();
        setCurrentPlayer(newPlayer);
        setIsLoggedIn(true);
        return;
      }

      throw new Error("Failed to log in player");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Login failed. Please try again.");
    }
  }

  async function updatePlayerStats(updatedPlayer) {
    try {
      const response = await fetch(`${API_BASE_URL}/${updatedPlayer.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wins: updatedPlayer.wins,
          losses: updatedPlayer.losses,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update player stats");
      }

      const savedPlayer = await response.json();
      setCurrentPlayer(savedPlayer);
    } catch (error) {
      console.error("Update stats error:", error);
    }
  }

  function handleGuess(letter) {
    if (guessedLetters.includes(letter) || gameStatus) {
      return;
    }

    const updatedGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(updatedGuessedLetters);

    if (!word.includes(letter)) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      if (newMistakes >= maxMistakes) {
        setGameStatus("lost");
      }
    } else {
      const uniqueLettersInWord = [...new Set(word.split(""))];
      const hasWon = uniqueLettersInWord.every((char) =>
        updatedGuessedLetters.includes(char)
      );

      if (hasWon) {
        setGameStatus("won");
      }
    }
  }

  function startNewGame() {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setMistakes(0);
    setGameStatus(null);
    setStatsUpdated(false);
  }

  useEffect(() => {
    if (!currentPlayer || !isLoggedIn || !gameStatus || statsUpdated) {
      return;
    }

    let updatedPlayer = currentPlayer;

    if (gameStatus === "won") {
      updatedPlayer = {
        ...currentPlayer,
        wins: currentPlayer.wins + 1,
      };
    }

    if (gameStatus === "lost") {
      updatedPlayer = {
        ...currentPlayer,
        losses: currentPlayer.losses + 1,
      };
    }

    setCurrentPlayer(updatedPlayer);
    setStatsUpdated(true);
    updatePlayerStats(updatedPlayer);
  }, [gameStatus, currentPlayer, isLoggedIn, statsUpdated]);

  const totalGames = currentPlayer
    ? currentPlayer.wins + currentPlayer.losses
    : 0;

  const winPercentage =
    totalGames === 0
      ? 0
      : ((currentPlayer.wins / totalGames) * 100).toFixed(1);

  return (
    <div className="app">
      <h1>Hangman Game</h1>

      {!isLoggedIn && (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerNameInput}
            onChange={(e) => setPlayerNameInput(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {loginError && <p>{loginError}</p>}
        </div>
      )}

      {isLoggedIn && currentPlayer && (
        <div>
          <h3>Player: {currentPlayer.name}</h3>
          <p>Wins: {currentPlayer.wins}</p>
          <p>Losses: {currentPlayer.losses}</p>
          <p>Win %: {winPercentage}%</p>
        </div>
      )}

      <HangmanImage mistakes={mistakes} />

      <p>Lives Left: {maxMistakes - mistakes}</p>

      <WordDisplay word={word} guessedLetters={guessedLetters} />

      <LetterButtons guessedLetters={guessedLetters} onGuess={handleGuess} />

      <p>
        Chosen Letters:{" "}
        {guessedLetters.length > 0 ? guessedLetters.join(", ") : "None"}
      </p>

      <NewGameButton onNewGame={startNewGame} />

      <GameStatusModal gameStatus={gameStatus} />

      {gameStatus === "lost" && <p>The word was: {word}</p>}
      {gameStatus === "won" && <p>You guessed the word: {word}</p>}
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import HangmanImage from "./HangmanDisplay";
import WordDisplay from "./WordDisplay";
import LetterButtons from "./LetterSelector";
import GameStatusModal from "./GameStatus";
import NewGameButton from "./NewGameButton";

const WORDS = ["REACT", "DOCKER", "JAVASCRIPT", "COMPONENT", "PROGRAM"];
const API_BASE_URL = "http://localhost:4000/api/players";

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function Game({ player, setPlayer }) {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);
  const [statsUpdated, setStatsUpdated] = useState(false);

  const maxMistakes = 5;

  async function updatePlayerStats(updatedPlayer) {
    try {
      const response = await fetch(`${API_BASE_URL}/${updatedPlayer.name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wins: updatedPlayer.wins,
          losses: updatedPlayer.losses,
        }),
      });

      if (!response.ok) throw new Error("Failed to update player stats");

      const savedPlayer = await response.json();
      setPlayer(savedPlayer);
    } catch (error) {
      console.error("Update stats error:", error);
    }
  }

  function handleGuess(letter) {
    if (guessedLetters.includes(letter) || gameStatus) return;

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
    let newWord = getRandomWord();
    while (newWord === word) {
        newWord = getRandomWord();
    }
        setWord(newWord);
        setGuessedLetters([]);
        setMistakes(0);
        setGameStatus(null);
        setStatsUpdated(false);
    
  }
  function logout() {
    setPlayer(null);
  }

  useEffect(() => {
    if (!player || !gameStatus || statsUpdated) return;

    let updatedPlayer = player;

    if (gameStatus === "won") {
      updatedPlayer = { ...player, wins: player.wins + 1 };
    }

    if (gameStatus === "lost") {
      updatedPlayer = { ...player, losses: player.losses + 1 };
    }

    setPlayer(updatedPlayer);
    setStatsUpdated(true);
    updatePlayerStats(updatedPlayer);
  }, [gameStatus, player, statsUpdated, setPlayer]);

  const totalGames = player ? player.wins + player.losses : 0;
  const winPercentage =
    totalGames === 0 ? 0 : ((player.wins / totalGames) * 100).toFixed(1);

  return (
    <div className="app">
      <div className="top-bar">
        <div>
          <h1>Hangman Game</h1>
          <p className="subtitle">Guess the word before you run out of lives.</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="stats-card">
        <h3>Player: {player.name}</h3>
        <p>Wins: {player.wins}</p>
        <p>Losses: {player.losses}</p>
        <p>Win %: {winPercentage}%</p>
      </div>

      <div className="game-container">
        <div className="left-panel">
          <HangmanImage mistakes={mistakes} />
          <p className="lives">Lives Left: {maxMistakes - mistakes}</p>
        </div>

        <div className="right-panel">
          <WordDisplay word={word} guessedLetters={guessedLetters} />

          <LetterButtons
            guessedLetters={guessedLetters}
            onGuess={handleGuess}
          />

          <p className="chosen-letters">
            Chosen Letters:{" "}
            {guessedLetters.length > 0 ? guessedLetters.join(", ") : "None"}
          </p>

          <NewGameButton onNewGame={startNewGame} />

          <GameStatusModal gameStatus={gameStatus} />

          {gameStatus === "lost" && <p>The word was: {word}</p>}
          {gameStatus === "won" && <p>You guessed the word: {word}</p>}
        </div>
      </div>
    </div>
  );
}

export default Game;
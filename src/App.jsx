import { useState } from "react";
import HangmanImage from "./components/HangmanImage";
import WordDisplay from "./components/WordDisplay";
import LetterButtons from "./components/LetterButtons";
import GameStatusModal from "./components/GameStatusModal";
import NewGameButton from "./components/NewGameButton";

const WORDS = ["REACT", "DOCKER", "JAVASCRIPT", "COMPONENT", "PROGRAM"];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
}

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);

  const maxMistakes = 5;

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
  }

  return (
    <div className="app">
      <h1>Hangman Game</h1>

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

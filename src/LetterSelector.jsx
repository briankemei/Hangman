function LetterButtons({ guessedLetters, onGuess }) {

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="letter-buttons">

      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter}
        </button>
      ))}

    </div>
  );
}

export default LetterButtons;
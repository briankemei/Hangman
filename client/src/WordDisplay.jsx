function WordDisplay({ word, guessedLetters }) {
    const displayWord = word.split("").map((letter, index) => {
        if (guessedLetters.includes(letter)) {
            return <span key={index}>{letter} </span>;
            } else {
                return <span key={index}>_ </span>;
                }
                });
                return (
                    <div className="word-display">
                        <h2>{displayWord}</h2>
                        </div>
  );
}

export default WordDisplay; 
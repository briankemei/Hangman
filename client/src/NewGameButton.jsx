function NewGameButton({ onNewGame }) {
  return (
    <div className="new-game">
      <button onClick={onNewGame}>
        New Game
      </button>
    </div>
  );
}

export default NewGameButton;
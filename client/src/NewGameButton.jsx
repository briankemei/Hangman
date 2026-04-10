function NewGameButton({ onNewGame}){
    return(
        <div className = "new-game">
            <button onclick={onNewGame}>
                New Game
            </button>
        </div>
    )

}
export default NewGameButton ;
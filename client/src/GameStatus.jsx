function GameStatusModal({ gameStatus }){

    if (!gameStatus) return null;

    return(
        <div className="game-status-model">
            {gameStatus == "Won" && <h2>You Won!</h2>}
            {gameStatus == "lost" && <h2>Game over!</h2>}

        </div>
    );
}

export default GameStatusModal;
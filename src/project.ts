import { useState } from "react";
import "./App.css";

export default function App() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    function handleClick(index) {
        if (board[index] || calculateWinner(board)) {
            return;
        }

        const nextBoard = [...board];
        nextBoard[index] = isXNext ? "X" : "O";

        setBoard(nextBoard);
        setIsXNext(!isXNext);
    }

    function resetGame() {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    }

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every((cell) => cell !== null);

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (isDraw) {
        status = "It's a draw!";
    } else {
        status = `Next player: ${isXNext ? "X" : "O"}`;
    }

    return (
        <div className="app">
            <h1>Tic-Tac-Toe</h1>
            <p className="subtitle">A beginner React game</p>

    <h2>{status}</h2>

    <div className="board">
        {board.map((value, index) => (
                <button
                    key={index}
            className="square"
            onClick={() => handleClick(index)}
>
    {value}
    </button>
))}
    </div>

    <button className="restart" onClick={resetGame}>
        Restart Game
    </button>
    </div>
);
}

function calculateWinner(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}
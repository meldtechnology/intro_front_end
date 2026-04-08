import React, { useMemo, useState } from "react";
import "./TicTacToe.css";

export default function TicTacToeApp() {
    const [board, setBoard] = useState(() => Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const winner = useMemo(() => calculateWinner(board), [board]);
    const isDraw = useMemo(
        () => !winner && board.every((cell) => cell !== null),
        [board, winner]
    );

    function handleClick(index) {
        if (board[index] !== null || winner) return;

        setBoard((prevBoard) => {
            const nextBoard = [...prevBoard];
            nextBoard[index] = isXNext ? "X" : "O";
            return nextBoard;
        });

        setIsXNext((prev) => !prev);
    }

    function resetGame() {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    }

    let status = `Next player: ${isXNext ? "X" : "O"}`;
    if (winner) status = `Winner: ${winner}`;
    if (isDraw) status = "It's a draw!";

    return (
        <main className="app-shell">
        <section className="app-card" aria-label="Tic-Tac-Toe game">
    <h1 className="app-title">Tic-Tac-Toe</h1>
        <p className="subtitle">A simple React game for beginners</p>

                                                        <div
        className="status"
    role="status"
    aria-live="polite"
    aria-atomic="true"
        >
        {status}
        </div>

        <div className="board" role="grid" aria-label="Tic-Tac-Toe board">
        {board.map((value, index) => (
                <button
                    key={index}
            type="button"
            className="square"
            onClick={() => handleClick(index)}
    aria-label={`Cell ${index + 1}${value ? `, ${value}` : ", empty"}`}
    disabled={value !== null || Boolean(winner)}
>
    <span className={`mark ${value === "X" ? "mark-x" : value === "O" ? "mark-o" : ""}`}>
    {value}
    </span>
    </button>
))}
    </div>

    <button type="button" className="restart" onClick={resetGame}>
        Restart Game
    </button>
    </section>
    </main>
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

    for (const [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}
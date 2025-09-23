import { useState } from "react";
import "./App.css";
import type { TicTacToe, Cell } from "./tictactoe";
import { makeMove, reset, determineDraw, determineWinner } from './tictactoe';

function Box({ cell, onClickHandler, index }: { cell: Cell, onClickHandler: (index: number) => void; index: number }) {
	return (
		<div
			onClick={() => onClickHandler(index)}
			className="h-24 w-24 bg-blue-400 flex items-center justify-center text-white font-bold rounded"
		>
			{cell}
		</div>
	);
}

function GameBoard({board, onClickHandler}: {board: Cell[], onClickHandler: (index: number) => void;}) {
	return (
		<div className="grid grid-cols-3 gap-2 max-w-xl mx-auto p-4">
			{board.map((cell: Cell, index: number) => {
				return (
					<Box key={index} cell={cell} onClickHandler={onClickHandler} index={index}></Box>
				);
			})}
		</div>
	);
}

function App() {
	const initialGame: TicTacToe = {
		board: Array(9).fill(null),
		currentPlayer: "X",
    winner: null
	};

	const [gameState, setGameState] = useState(initialGame);

	function onClick(index: number) {
		const movePlayedState: TicTacToe | null = makeMove(gameState, index);
		if (movePlayedState) {
      const winner = determineWinner(movePlayedState.board)
      
      if(winner != null) {
        console.log(`${winner} wins!`)
      } 
      if(determineDraw(movePlayedState.board)) {
        console.log("Draw")
      }
			
      
      setGameState(movePlayedState);
		}


	}

	return (
		<div>
			<h1 className="text-red-500">Tic-tac-toe!</h1>
			<GameBoard board={gameState.board} onClickHandler={onClick} />
		</div>
	);
}

export default App;

import { useState } from "react";
import "./App.css";
import "./tictactoe.ts"
import { TicTacToe } from './tictactoe';

const Box = () => (
	<div className="h-24 w-24 bg-blue-400 flex items-center justify-center text-white font-bold rounded">
		X
	</div>
);

type GameBoardProps = {
  gameState: TicTacToe; // whatever class/type you made
};

const GameBoard = ({ gameState }:) => {
	return (
		<div className="grid grid-cols-3 gap-2 max-w-xl mx-auto p-4">
        {gameState.board.map( (cell: Cell) => {
          return (
            <Box>{cell}</Box>
          )
        })}
		</div>
	);
};

function App() {
  const initialGame = TicTacToe = {
      board: Array(9).fill(null),
      currentPlayer: "X",
  }

	const [gameState, setGameState] = useState(initialGame);

	return (
		<div>
			<h1 className="text-red-500">Tic-tac-toe!</h1>
      <GameBoard gameState:{initialGame}/>
		</div>
	);
}

export default App;

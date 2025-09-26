import "./App.css";
import type { TicTacToe, Cell, Winner } from "./types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGame, makeMove, reset } from "./api";

type BoxProps = {
	cell: Cell;
	onClick: () => void;
};

type GameBoardProps = {
	board: Cell[];
	onCellClick: (index: number) => void;
};

type OutcomeProps = {
	winner: Winner;
	isDraw: boolean;
	onReplay: () => void;
};

function Box({ cell, onClick }: BoxProps) {
	return (
		<div
			onClick={onClick}
			className="h-24 w-24 bg-blue-400 flex items-center justify-center text-white font-bold rounded cursor-pointer hover:bg-blue-500"
		>
			{cell}
		</div>
	);
}

function GameBoard({ board, onCellClick }: GameBoardProps) {
	return (
		<div className="grid grid-cols-3 gap-2 max-w-xl mx-auto p-4">
			{board.map((cell, index) => {
				return (
					<Box
						key={index}
						cell={cell}
						onClick={() => onCellClick(index)}
					/>
				);
			})}
		</div>
	);
}

function Outcome({ winner, isDraw, onReplay }: OutcomeProps) {
	if (!winner && !isDraw) return null;

	return (
		<div className="text-center mt-4">
			<div className="text-red-800 font-bold mb-2">
				{winner ? `${winner} Won!` : "It's a Draw!"}
			</div>
			<button
				onClick={onReplay}
				className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
			>
				Play Again
			</button>
		</div>
	);
}

function Game({ gameID }: { gameID: string }) {
	const queryClient = useQueryClient();

	const moveMutation = useMutation({
		mutationFn: makeMove,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["game", gameID] }),
		onError: (error: Error) => {
			console.log("Move failed:", error.message);
		},
	});

	const resetMutation = useMutation({
		mutationFn: reset,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["game", gameID] }),
	});

	const { isPending, isFetching, error, data } = useQuery({
		queryKey: ["game", gameID],
		queryFn: () => getGame(gameID),
	});
	if (isPending) {
		console.log("Loading...");
		return <h2>Loading...</h2>;
	}
	if (error) {
		console.log(`Error on load ${error.message}`);
		return <h2>Something went wrong: {error.message}</h2>;
	}
	if (isFetching) {
		console.log("Fetching...");
	}

	const gameState = data;

	const handleCellClick = (index: number) => {
		console.log(`Making move at index: ${index}`);
		moveMutation.mutate({ gameID, index });
	};

	const handleReplay = () => {
		console.log("Reseting");
		resetMutation.mutate(gameID);
	};

	return (
		<div className="min-h-screen bg-gray-100 py-8">
			<div className="max-w-2xl mx-auto text-center">
				<h1 className="text-4xl font-bold text-red-800 mb-8">
					Tic-Tac-Toe
				</h1>

				<GameBoard
					board={gameState.board}
					onCellClick={handleCellClick}
				/>

				<Outcome
					winner={gameState.winner}
					isDraw={gameState.isDraw}
					onReplay={handleReplay}
				/>
			</div>
		</div>
	);
}

export default Game;

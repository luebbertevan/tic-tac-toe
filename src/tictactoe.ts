import { type Cell, type Winner, type TicTacToe } from "./types";

export function makeMove(state: TicTacToe, index: number): TicTacToe | null {
	if (state.board[index] !== null || state.winner || state.isDraw) {
		return null;
	}

	const newBoard = [...state.board];
	newBoard[index] = state.currentPlayer;

	const winner = determineWinner(newBoard);
	const isDraw = !winner && newBoard.every((cell) => cell !== null);

	return {
		board: newBoard,
		currentPlayer: state.currentPlayer === "X" ? "O" : "X",
		winner,
		isDraw,
	};
}

export function createInitialGame(): TicTacToe {
	return {
		board: Array(9).fill(null),
		currentPlayer: "X",
		winner: null,
		isDraw: false,
	};
}

export function determineWinner(board: Cell[]): Winner {
	const winningLines: number[][] = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (const [a, b, c] of winningLines) {
		if (board[a] && board[a] === board[b] && board[b] === board[c]) {
			return board[a];
		}
	}
	return null;
}

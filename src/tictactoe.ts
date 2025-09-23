export type Player = "X" | "O";
export type Cell = Player | null;

export type TicTacToe = {
	board: Cell[];
	currentPlayer: Player;
}

export function makeMove(state: TicTacToe, index: number): TicTacToe | null {
	if (state.board[index] !== null) return null; 
	const newState: TicTacToe = structuredClone(state)
	newState.board[index] = state.currentPlayer;
	const newPlayer: Player = state.currentPlayer === "X" ? "O" : "X";
	newState.currentPlayer = newPlayer;
	return newState;
}

export function reset(state: TicTacToe): TicTacToe {
	const newState: TicTacToe = structuredClone(state)
	newState.board = Array(9).fill(null);
	newState.currentPlayer = 'X';
	return newState
}

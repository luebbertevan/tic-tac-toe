export type Player = "X" | "O";
export type Cell = Player | null;

export type TicTacToe {
	board: Cell[];
	currentPlayer: Player;
}

export function makeMove(state: TicTacToe, index: number): TicTacToe | null {
	if (state.board[index] !== null) return null; // use structure clone

	const newState: TicTacToe = structuredClone(state)
	newState.board[index] = state.currentPlayer;
	const newPlayer: Player = state.currentPlayer === "X" ? "O" : "X";
	newState.currentPlayer = newPlayer;

	return newState;
}

export funciton reset() {
	this.board = Array(9).fill(null);
	this.currentPlayer = 'X';
}

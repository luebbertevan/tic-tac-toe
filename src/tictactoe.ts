export type Player = "X" | "O";
export type Cell = Player | null;
export type Winner = Player | null;

export type TicTacToe = {
	board: Cell[];
	currentPlayer: Player;
	winner: Winner;
};

export function makeMove(state: TicTacToe, index: number): TicTacToe | null {
	if (state.board[index] !== null) return null;
	const newState: TicTacToe = structuredClone(state);
	newState.board[index] = state.currentPlayer;
	const newPlayer: Player = state.currentPlayer === "X" ? "O" : "X";
	newState.currentPlayer = newPlayer;
	return newState;
}

export function reset(state: TicTacToe): TicTacToe {
	const newState: TicTacToe = structuredClone(state);
	newState.board = Array(9).fill(null);
	newState.currentPlayer = "X";
	return newState;
}

export function determineWinner(board: Cell[]): Player | null {
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
	const winningLine = winningLines.find(([a, b, c,]) => 
		(board[a] !== null) && (board[a] === board[b]) && (board[b] === board[c])
	)
	if(winningLine !== undefined){
		return board[winningLine[0]]
	}
	else {
		return null
	}
}

export function determineDraw(board: Cell[]): boolean {
	return board.every((cell) => cell !== null)
}
	

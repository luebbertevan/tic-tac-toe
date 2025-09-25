type Player = "X" | "O";
export type Cell = Player | null;
export type Winner = Player | null;

export type TicTacToe = {
	board: Cell[];
	currentPlayer: Player;
	winner: Winner;
	isDraw: boolean;
	gameID: string;
};
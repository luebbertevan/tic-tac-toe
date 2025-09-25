import { type TicTacToe } from "./types";

export async function getGame(gameID: string): Promise<TicTacToe> {
	const res = await fetch("/game/" + gameID);
	return await res.json();
}

export async function createGame(): Promise<string> {
	const res = await fetch("/create", {
		method: "POST",
	})
	
	const newGame: TicTacToe = await res.json()
	const gameID = newGame.gameID
	return gameID;
}
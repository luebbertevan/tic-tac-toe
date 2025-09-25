import { type TicTacToe } from "./types";


export async function createGame(): Promise<TicTacToe> {
	const res = await fetch("/create", {
		method: "POST",
	})	
	const newGame: TicTacToe = await res.json()
	return newGame
}

export async function getGame(gameID: string): Promise<TicTacToe> {
	const res = await fetch("/game/" + gameID);
	return await res.json();
}

export async function makeMove(gameID: string, index: number) {
	const res = await fetch("/move" + gameID, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ index }),
	});

	if (!res.ok) {
		const err = await res.json();
		throw new Error(err.error || "Unknown error");
	}

	return await res.json();
}

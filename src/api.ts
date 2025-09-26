import { type TicTacToe } from "./types";

export async function createGame(): Promise<string> {
	console.log("sending create request");
	const res = await fetch("/create", { method: "POST" });
	if (!res.ok) {
		const err = await res.json().catch(() => ({ error: "Unknown" }));
		throw new Error(err.error || "Failed to create game"); //goes up callstack to noError in React Query
	}
	const { gameID } = await res.json();
	console.log(`Created new game with ID: ${gameID}`);
	return gameID;
}

export async function getList(): Promise<string[]> {
	const res = await fetch("/list");
	const games = (await res.json()) as string[];
	return games;
}

export async function getGame(gameID: string): Promise<TicTacToe> {
	const res = await fetch(`/game/${gameID}`);
	return await res.json();
}

export async function makeMove({
	gameID,
	index,
}: {
	gameID: string;
	index: number;
}) {
	const res = await fetch(`/move/${gameID}`, {
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

export async function reset(gameID: string) {
	const res = await fetch(`/reset/${gameID}`, { method: "POST" });
	return await res.json();
}

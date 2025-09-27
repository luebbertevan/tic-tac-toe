import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { games } from "./schema";
import type { Cell, Player, TicTacToe, Winner } from "../types";
import { eq } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error("No database URL provided");
}

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);

export async function insertGame({
	gameID,
	board,
	currentPlayer,
	winner,
	isDraw,
}: TicTacToe): Promise<void> {
	await db.insert(games).values({
		gameID,
		board,
		currentPlayer,
		winner,
		isDraw,
	});
}

// Get list of game IDs
export async function listGames(): Promise<string[]> {
	const result = await db
		.select({
			gameID: games.gameID,
		})
		.from(games);

	return result.map((row) => row.gameID);
}

// Get a single game by ID
export async function getGame(gameID: string): Promise<TicTacToe | null> {
	const [row] = await db.select().from(games).where(eq(games.gameID, gameID));
	if (!row) return null;

	return {
		gameID: row.gameID,
		board: row.board as Cell[],
		currentPlayer: row.currentPlayer as Player,
		winner: row.winner as Winner,
		isDraw: row.isDraw,
	};
}

// Update a game after a move
export async function updateGame(game: TicTacToe): Promise<void> {
	await db
		.update(games)
		.set({
			board: game.board,
			currentPlayer: game.currentPlayer,
			winner: game.winner,
			isDraw: game.isDraw,
		})
		.where(eq(games.gameID, game.gameID));
}

// Reset a game (same ID, new initial state)
export async function resetGame(game: TicTacToe): Promise<boolean> {
	const gameUpdate = await db
		.update(games)
		.set({
			board: game.board,
			currentPlayer: game.currentPlayer,
			winner: game.winner,
			isDraw: game.isDraw,
		})
		.where(eq(games.gameID, game.gameID))
		.returning();
	return gameUpdate.length > 0;
}

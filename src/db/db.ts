import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { games } from './schema';
import type { TicTacToe } from '../types';

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('No database URL provided');
}

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);

export async function insertGame({gameID, board, currentPlayer, winner, isDraw}: TicTacToe): Promise<void> {
	await db.insert(games).values({
		gameID,
		board,
		currentPlayer,
		winner,
		isDraw,
	});
}
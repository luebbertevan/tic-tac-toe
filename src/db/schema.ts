//bun drizzle-kit --config ./src/drizzle.config.ts generate
//bun drizzle-kit --config ./src/drizzle.config.ts migrate

import { pgTable, uuid, json, varchar, timestamp, boolean } from "drizzle-orm/pg-core";


export const games = pgTable("games", {
	gameID: uuid("id").primaryKey(),
	board: json("board").notNull(),
	currentPlayer: varchar("current_player", { length: 1 }).notNull(),
	winner: varchar("winner", { length: 1 }),
	isDraw: boolean("is_draw").default(false).notNull(),
	created_at: timestamp("created_at").defaultNow().notNull(),
});
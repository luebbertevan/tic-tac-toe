
import { pgTable, uuid, json, varchar, timestamp } from "drizzle-orm/pg-core";


export const games = pgTable("games", {
	id: uuid("id").primaryKey(),
	board: json("board").notNull(),
	current_player: varchar("current_player", { length: 1 }).notNull(),
	winner: varchar("winner", { length: 1 }),
	created_at: timestamp("created_at").defaultNow().notNull(),
});
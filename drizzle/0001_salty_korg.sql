ALTER TABLE "games" RENAME COLUMN "id" TO "gameID";--> statement-breakpoint
ALTER TABLE "games" ADD COLUMN "isDraw" boolean DEFAULT false NOT NULL;
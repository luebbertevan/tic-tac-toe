CREATE TABLE "games" (
	"id" uuid PRIMARY KEY NOT NULL,
	"board" json NOT NULL,
	"current_player" varchar(1) NOT NULL,
	"winner" varchar(1),
	"created_at" timestamp DEFAULT now() NOT NULL
);

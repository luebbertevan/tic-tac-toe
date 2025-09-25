import express, { type Request, type Response } from "express";
import ViteExpress from "vite-express";
import { createInitialGame, makeMove } from "./tictactoe";
import type { TicTacToe } from "./types";

const app = express();
const PORT = 3000;

app.use(express.json());

let games = new Map<string, TicTacToe>()

let gameState = createInitialGame();
games.set(gameState.gameID, gameState);

app.get("/game:id", (req: Request, res: Response) => {
	const { gameID } = req.body;
	const gameState = games.get(gameID)
	res.json(gameState)
});


app.post("/move", (req: Request, res: Response) => {
	const { index } = req.body;
	const newState = makeMove(gameState, index);

	if (!newState) {
		return res.status(400).json({ error: "Invalid move" });
	}

	gameState = newState;
	res.json(gameState);
});

app.post("/reset", (_req: Request, res: Response) => {
	gameState = createInitialGame(); //FIXME do I need new function to keep the same id?
	res.json(gameState);
});

ViteExpress.listen(app, PORT, () =>
	console.log(`Server is listening at http://localhost:${PORT}`)
);

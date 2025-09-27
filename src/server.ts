import express, { type Request, type Response } from "express";
import ViteExpress from "vite-express";
import { createInitialGame, makeMove } from "./tictactoe";
import type { TicTacToe } from "./types";
import { insertGame } from "./db/db"; 


const app = express();
const PORT = 3000;

app.use(express.json());

const games = new Map<string, TicTacToe>();

app.post("/create", async (_req: Request, res: Response) => {
	const newGame = createInitialGame();
	games.set(newGame.gameID, newGame);
	await insertGame(newGame);
	res.json({ gameID: newGame.gameID });
});

app.get("/list", (_req: Request, res: Response) => {
	res.json([...games.keys()]);
});

app.get("/game/:gameID", (req: Request, res: Response) => {
	const gameID = req.params.gameID;
	const gameState = games.get(gameID);
	if (!gameState) {
		return res.status(404).json({ error: "Game not found" });
	}
	res.json(gameState);
});

app.post("/move/:gameID", (req: Request, res: Response) => {
	const { index } = req.body;
	const gameID = req.params.gameID;
	const gameState = games.get(gameID);
	if (!gameState) {
		return res.status(404).json({ error: "Game not found" });
	}
	const newState = makeMove(gameState, index);

	if (!newState) {
		return res.status(400).json({ error: "Invalid move" });
	}

	games.set(gameID, newState);
	res.json(newState);
});

app.post("/reset/:gameID", (req: Request, res: Response) => {
	const gameID = req.params.gameID;
	const oldGame = games.get(gameID);

	if (!oldGame) {
		return res.status(404).json({ error: "Game not found" });
	}

	const newGame = { ...createInitialGame(), gameID }; // keep the same ID
	games.set(gameID, newGame);
	res.json(newGame);
});

ViteExpress.listen(app, PORT, () =>
	console.log(`Server is listening at http://localhost:${PORT}`)
);

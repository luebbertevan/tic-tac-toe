import express, { type Request, type Response } from "express";
import ViteExpress from "vite-express";
import { createInitialGame, makeMove } from "./tictactoe";
import { getGame, insertGame, listGames, resetGame, updateGame } from "./db/db";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/create", async (_req: Request, res: Response) => {
	const newGame = createInitialGame();
	await insertGame(newGame);
	res.json({ gameID: newGame.gameID });
});

app.get("/list", async (_req: Request, res: Response) => {
	const list = await listGames();
	res.json(list);
});

app.get("/game/:gameID", async (req: Request, res: Response) => {
	const gameID = req.params.gameID;
	const gameState = await getGame(gameID);
	if (!gameState) {
		return res.status(404).json({ error: "Game not found" });
	}
	res.json(gameState);
});

app.post("/move/:gameID", async (req: Request, res: Response) => {
	const { index } = req.body;
	const gameID = req.params.gameID;
	const gameState = await getGame(gameID);
	if (!gameState) {
		return res.status(404).json({ error: "Game not found" });
	}
	const newState = makeMove(gameState, index);

	if (!newState) {
		return res.status(400).json({ error: "Invalid move" });
	}

	await updateGame(newState);
	res.json(newState);
});

app.post("/reset/:gameID", async (req: Request, res: Response) => {
	const gameID = req.params.gameID;

	const newGame = { ...createInitialGame(), gameID }; // keep the same ID
	const success = await resetGame(newGame);

	if (!success) {
		return res.status(404).json({ error: "Game not found" });
	}
	res.json(newGame);
});

ViteExpress.listen(app, PORT, () =>
	console.log(`Server is listening at http://localhost:${PORT}`)
);

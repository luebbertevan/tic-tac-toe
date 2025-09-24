import express, { type Request, type Response } from "express";
import ViteExpress from "vite-express";
import { createInitialGame, makeMove } from "./tictactoe";

const app = express();
const PORT = 3000;

app.use(express.json());

let gameState = createInitialGame();

app.get("/game", (_req: Request, res: Response) => res.json(gameState));

app.post("/move", (req: Request, res: Response) => {
	const index = req.body;
	const newState = makeMove(gameState, index);

	if (!newState) {
		return res.status(400).json({ error: "Invalid move" });
	}

	gameState = newState;
	res.json(gameState);
});

app.post("/reset", (_req: Request, res: Response) => {
	gameState = createInitialGame();
	res.json(gameState);
});

ViteExpress.listen(app, PORT, () =>
	console.log(`Server is listening at ${PORT}`)
);

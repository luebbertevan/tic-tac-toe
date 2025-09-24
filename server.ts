import express from "express";
import ViteExpress from "vite-express";
import { createInitialGame, makeMove, type TicTacToe } from "./tictactoe";

const app = express();
const PORT = 3000;

app.use(express.json());

let gameState = createInitialGame();


app.get("/game", (_, res) => res.json(gameState));

app.post("/move", (req, res) => {
	const index = req.body;
	gameState = makeMove(gameState, index)
	res.json(gameState)
})

ViteExpress.listen(app, PORT, () => console.log(`Server is listening at ${PORT}`));
import "./App.css";
import { useMutation } from "@tanstack/react-query";
import Game from "./Game";
import { createGame } from "./api";
import { useState } from "react";

function GameLobby() {
	const [gameID, setGameID] = useState<string | undefined>(undefined);

	const createGameMutation = useMutation({
		mutationFn: createGame,
		onSuccess: (data) => setGameID(data),
	});

	return (
		<div>
			<h1>Game Lobby</h1>
			<button key="newGame" onClick={() => createGameMutation.mutate()}>
				Create Game
			</button>
			{gameID && <Game gameID={gameID} />}
		</div>
	);
}

export default GameLobby;

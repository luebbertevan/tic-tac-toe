import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGame, getList } from "./api";

function GameLobby({ onGameClick }: { onGameClick: (id: string) => void }) {
	const queryClient = useQueryClient();

	const createGameMutation = useMutation({
		mutationFn: createGame,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["games"] }),
		onError: (error: Error) => {
			console.log("Create game failed:", error.message);
		},
	});

	const { isPending, isFetching, error, data } = useQuery({
		queryKey: ["games"],
		queryFn: getList,
	});
	if (isPending) {
		console.log("Loading Games List...");
		return <div>Loading Games List...</div>;
	}
	if (error) {
		console.log(`Error on games list load ${error.message}`);
		return <h2>Something went wrong: {error.message}</h2>;
	}
	if (isFetching) {
		console.log("Fetching Games List...");
	} else {
		return (
			<div>
				<h1>Game Lobby</h1>
				<button
					key="newGame"
					onClick={() => createGameMutation.mutate()}
				>
					Create Game
				</button>{" "}
				{data.map((gameID) => (
					<button key={gameID} onClick={() => onGameClick(gameID)}>
						Game ID: {gameID}
					</button>
				))}
			</div>
		);
	}
}

export default GameLobby;

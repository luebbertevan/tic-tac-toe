import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGame, getList } from "./api";
import { useEffect, useState } from "react";


function GameLobby({ onGameClick }: { onGameClick: (id: string) => void }) {
	const queryClient = useQueryClient();

	const createGameMutation = useMutation({
		mutationFn: createGame,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["games"] }),
		onError: (error: Error) => {
			console.log("Create game failed:", error.message);
		},
	});

	const [polling, setPolling] = useState(true);

	const { isPending, isFetching, error, data } = useQuery({
		queryKey: ["games"],
		queryFn: getList,
		refetchInterval: polling ? 1000 : false,
		staleTime: 5000, 
	});

	// stop polling if there’s an error
	useEffect(() => {
		if (error) {
			setPolling(false);
		}
	}, [error]);

	if (isPending) {
		console.log("Loading Games List...");
		return <div>Loading Games List...</div>;
	}
	if (error) {
		console.log(`Error on games list load ${error.message}`);
		return <h2>Something went wrong: {error.message}</h2>;
	}
	if (isFetching) {
		//console.log("Fetching Games List...");
	} 
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

export default GameLobby;

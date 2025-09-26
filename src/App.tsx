import "./App.css";
import { useState } from "react";
import Game from "./Game";
import GameLobby from "./GameLobby";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	const [gameID, setGameID] = useState<string | undefined>(undefined);

	const handleGameClick = (gameID: string) => {
		console.log(`GameID: ${gameID} Selected`);
		setGameID(gameID);
	};

	const handleBackToLobby = () => {
		setGameID(undefined);
	};

	return (
		<>
			<QueryClientProvider client={queryClient}>
				{gameID ? (
					<div className="text-center">
						<Game gameID={gameID} onLobbyClick={handleBackToLobby}/>
					</div>
				) : (
					<GameLobby onGameClick={handleGameClick} />
				)}
			</QueryClientProvider>
		</>
	);
}

export default App;

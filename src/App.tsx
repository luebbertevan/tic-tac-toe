import "./App.css";
import { useState } from "react";
import Game from "./Game";
import GameLobby from "./GameLobby";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	const [selectedID, setSelectedID] = useState<string | undefined>(undefined);

	const handleGameClick = (gameID: string) => {
		console.log(`GameID: ${gameID} Selected`);
		setSelectedID(gameID);
	};

	const handleBackToLobby = () => {
		setSelectedID(undefined);
	};

	return (
		<>
			<QueryClientProvider client={queryClient}>
				{selectedID ? (
					<div className="text-center">
						<Game gameID={selectedID} onLobbyClick={handleBackToLobby}/>
					</div>
				) : (
					<GameLobby onGameClick={handleGameClick} />
				)}
			</QueryClientProvider>
		</>
	);
}

export default App;

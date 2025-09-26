import "./App.css";
import Game from "./Game";
import GameLobby from "./GameLobby";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<GameLobby/>
			</QueryClientProvider>
		</>
	);
}

export default App;

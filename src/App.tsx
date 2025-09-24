import "./App.css";
import Game from "./Game";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Game />
			</QueryClientProvider>
		</>
	);
}

export default App;

import { useState } from "react";
import "./App.css";

const Box = () => (
	<div className="h-24 w-24 bg-blue-400 flex items-center justify-center text-white font-bold rounded">
		X
	</div>
);

const Grid = () => {
	return (
		<div className="grid grid-cols-3 gap-2 max-w-xl mx-auto p-4">
			<Box></Box>
			<Box></Box>
			<Box></Box>
			<Box></Box>
			<Box></Box>
			<Box></Box>
			<Box></Box>
			<Box></Box>
			<Box></Box>
		</div>
	);
};

function App() {
	const [box, setBox] = useState(Box);

	return (
		<div>
			<h1 className="text-red-500">Tic-tac-toe!</h1>
      <Grid />
			
		</div>
	);
}

export default App;

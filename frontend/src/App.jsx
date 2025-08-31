import { BrowserRouter } from "react-router-dom";
import AppContent from "./app/AppContent";
import Queries from "./config/query.config.jsx";
import { AnimatePresence } from "motion/react";

function App() {
	return (
		<BrowserRouter>
			<Queries>
				<AnimatePresence>
					<AppContent />
				</AnimatePresence>
			</Queries>
		</BrowserRouter>
	)
}

export default App

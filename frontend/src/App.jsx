import { BrowserRouter } from "react-router-dom";
import AppContent from "./app/AppContent";
import { AnimatePresence } from "motion/react";

function App() {
	return (
		<BrowserRouter>
            <AnimatePresence>
                <AppContent />
            </AnimatePresence>
		</BrowserRouter>
	)
}

export default App

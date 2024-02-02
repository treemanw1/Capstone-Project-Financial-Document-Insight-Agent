import logo from "./logo.svg";
import "./App.css";
import { Box } from "@mui/material";
import { MainLayout } from "./MainLayout";
import Header from "./components/Header";
import { Home } from "./Home";
import { ResultsPage } from "./ResultsPage";
import { PreviewPage } from "./PreviewPage"
import { SavedReports } from "./SavedReports"


function App() {
	return (
		<>
			<SavedReports/>
		</>
	);
}

export default App;
 
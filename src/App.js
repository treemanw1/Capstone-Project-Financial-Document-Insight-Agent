import logo from "./logo.svg";
import "./App.css";
import { Box } from "@mui/material";
import { MainLayout } from "./MainLayout";
import Header from "./components/Header";
import { Home } from "./Home";
import { AdvancedSearch } from "./AdvancedSearch";

function App() {
	return (
		<>
			<AdvancedSearch />
		</>
	);
}

export default App;

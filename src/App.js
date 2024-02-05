import "./App.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Home } from "./pages/Home";
import { AdvancedSearch } from "./pages/AdvancedSearch";
import { ReportPreview } from "./pages/ReportPreview";
import { ResultsPage } from "./pages/ResultsPage";
import { SavedReports } from "./pages/SavedReports";

import Test from "./pages/Test";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/advanced-search",
		element: <AdvancedSearch />,
	},
	{
		path: "/report-preview",
		element: <ReportPreview />,
	},
	{
		path: "/results-page",
		element: <ResultsPage />,
	},
	{
		path: "/saved-reports",
		element: <SavedReports />,
	},
	{
		path: "/test",
		element: <Test />,
	},
]);

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<RouterProvider router={router} />
		</LocalizationProvider>
	);
}

export default App;

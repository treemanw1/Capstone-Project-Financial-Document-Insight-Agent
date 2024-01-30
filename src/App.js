import "./App.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Home } from "./Home";
import Header from "./components/Header";
import { AdvancedSearch } from "./AdvancedSearch";
import Test from "./pages/Test";

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
		path: "/test",
		element: <Test />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

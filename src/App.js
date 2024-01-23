import "./App.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Home } from "./Home";
import Header from "./components/Header";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/header",
		element: <Header />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

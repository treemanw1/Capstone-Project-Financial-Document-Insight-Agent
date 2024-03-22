"use client";

import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

interface ThemeWrapperProps {
	children: ReactNode;
}

export const ColorModeContext = React.createContext({
	toggleColorMode: () => {},
});

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
	const [mode, setMode] = React.useState<PaletteMode>("light");

	const getDesignTokens = (mode: PaletteMode) => ({
		palette: {
			mode,
			...(mode === "light"
				? {
						// Light Mode
						primary: {
							main: "#F1F1F2",
							light: "#FAFAFA",
							dark: "#EAE9EB",
						},
						secondary: {
							main: "#22262B",
							light: "#2C333A",
							dark: "#1D2125",
						},
						text: {
							primary: "#22262B",
						},
				  }
				: {
						// Dark Mode
						primary: {
							main: "#212121",
							light: "#171717",
							dark: "#2F2F2F",
						},
						secondary: {
							main: "#272727",
							light: "#2C2C2C",
							dark: "#252525",
						},
						text: {
							primary: "#ECECEC",
						},
				  }),
		},
	});

	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) =>
					prevMode === "light" ? "dark" : "light"
				);
			},
		}),
		[]
	);

	const theme = React.useMemo(
		() => createTheme(getDesignTokens(mode)),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default ThemeWrapper;

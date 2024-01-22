import React from "react";
import { Box, Container } from "@mui/material";

export const MainLayout = ({ children }) => {
	return (
		<Container maxWidth={true}>
			<Box sx={{ mx: "10vh", backgroundColor: "lightcoral" }}>
				{children}
			</Box>
		</Container>
	);
};

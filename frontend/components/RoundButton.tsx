"use client";

import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface MyComponentProps {
	text: string;
	height?: string;
	width: string;
	fontSize?: string;
	onClick?: () => void;
}

const RoundButton: React.FC<MyComponentProps> = ({
	text,
	height = "7.5vh",
	width,
	fontSize = "1.75vh",
	onClick,
}) => {
	const theme = useTheme();

	return (
		<Button
			size="large"
			sx={{
				boxShadow: 3,
				// background: "pink",
				height: height,
				width: width,
				// fontSize: fontSize,
				// fontWeight: "bold",
				backgroundColor: theme.palette.primary.dark,
				borderRadius: "25px",
				color: "black",
				textTransform: "none",
				py: 1,
				px: 2,
				"&:hover": {
					backgroundColor: theme.palette.secondary.light,
					color: "white",
				},
			}}
			onClick={onClick}
		>
			{text}
		</Button>
	);
};

export default RoundButton;

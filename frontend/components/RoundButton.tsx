"use client";

import React from "react";
import { Button } from "@mui/material";

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
				backgroundColor: "#D9D9D9",
				borderRadius: "25px",
				color: "black",
				textTransform: "none",
				py: 1,
				px: 2,
				"&:hover": {
					backgroundColor: "#B5B5B5",
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

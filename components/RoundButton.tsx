"use client";

import React from "react";
import { Button } from "@mui/material";

interface MyComponentProps {
	text: string;
	height?: string;
	width: string;
	fontSize: string;
	onClick?: () => void;
}

const RoundButton: React.FC<MyComponentProps> = ({
	text,
	height = "7.5vh",
	width,
	fontSize,
	onClick,
}) => {
	return (
		<Button
			sx={{
				// background: "pink",
				height: height,
				width: width,
				fontSize: fontSize,
				backgroundColor: "#D9D9D9",
				borderRadius: "50px",
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

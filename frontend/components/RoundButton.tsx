"use client";

import React from "react";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styles from "../app/layout.module.css";

interface MyComponentProps {
	text: string;
	height?: string;
	width: string;
	fontSize?: string;
	background?: string;
	color?: string;
	onClick?: () => void;
}

const RoundButton: React.FC<MyComponentProps> = ({
	text,
	height = "7.5vh",
	width,
	fontSize = "1.75vh",
	background,
	color,
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
				backgroundColor: background
					? background
					: theme.palette.primary.dark,
				borderRadius: "30px",
				color: color ? color : "black",
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
			<Typography className={styles.font}>{text}</Typography>
		</Button>
	);
};

export default RoundButton;

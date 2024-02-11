import React from "react";
import { Box, Button } from "@mui/material";

const RoundButton = ({ props, handleClick = () => console.log("click") }) => {
	// props:
	// { text, height, width, fontSize }
	// handleClick
	return (
		<Button
			sx={{
				height: props.height,
				width: props.width,
				fontSize: props.fontSize,
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
			onClick={handleClick}
		>
			{props.text}
		</Button>
	);
};

export default RoundButton;

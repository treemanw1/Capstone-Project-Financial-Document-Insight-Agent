import React from "react";
import { Box } from "@mui/material";

const RoundButton = ({ style }) => {
	return (
		<Box
			sx={{
				borderRadius: "50px",
				backgroundColor: "#D9D9D9",
				p: 2,
				width: style.width,
				fontSize: style.fontSize,
			}}
		>
			{style.text}
		</Box>
	);
};

export default RoundButton;

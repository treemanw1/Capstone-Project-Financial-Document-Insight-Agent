import React from "react";
import { Box, Typography } from "@mui/material";

interface MyComponentProps {
	text: string;
	noDocuments: number;
	lastSaved?: string;
	width: string;
	fontSize: string;
}

const ReportButton: React.FC<MyComponentProps> = ({
	text,
	noDocuments,
	lastSaved = "",
	width,
	fontSize,
}) => {
	return (
		<Box
			sx={{
				borderRadius: "5px",
				backgroundColor: "#D9D9D9",
				p: 2,
				width: width,
				fontSize: fontSize,
			}}
		>
			<Typography fontWeight={"bold"} fontSize={fontSize}>
				{text}
			</Typography>
			<Typography fontSize={fontSize} sx={{ mb: "-4px" }}>
				No. of Documents: {noDocuments}
			</Typography>
			<Typography fontSize={fontSize}>Last saved: {lastSaved}</Typography>
		</Box>
	);
};

export default ReportButton;

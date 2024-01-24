import React from "react";
import { Box, Typography } from "@mui/material";

const ReportButton = ({ style }) => {
	return (
		<Box
			sx={{
				borderRadius: "5px",
				backgroundColor: "#D9D9D9",
				p: 2,
				width: style.width,
				fontSize: style.fontSize,
			}}
		>
			<Typography fontWeight={"bold"} fontSize={style.fontSize}>
				{style.text}
			</Typography>
			<Typography fontSize={style.fontSize} sx={{ mb: "-4px" }}>
				No. of Documents: {style.noDocuments}
			</Typography>
			<Typography fontSize={style.fontSize}>
				Last saved: {style.lastSaved}
			</Typography>
		</Box>
	);
};

export default ReportButton;

import React from "react";
import { Box, TextField, Typography } from "@mui/material";

const SearchField = ({ props }) => {
	return (
		<Box sx={{ background: "", width: props.width }}>
			<Typography
				sx={{ fontSize: props.fontSize, color: "#757575", mb: "5px" }}
			>
				{props.title}
			</Typography>
			<TextField
				sx={{
					width: "100%",
					color: "success.main",
					borderRadius: "40px",
					"& .MuiOutlinedInput-root": {
						borderRadius: "30px",
					},
					"& .MuiInputBase-root": {
						height: props.height,
					},
				}}
			></TextField>
		</Box>
	);
};

export default SearchField;

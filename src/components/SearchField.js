import React from "react";
import { TextField, Typography } from "@mui/material";

const SearchField = ({ props }) => {
	return (
		<>
			<Typography sx={{ fontSize: "13px", color: "#757575" }}>
				{props.title}
			</Typography>
			<TextField
				sx={{
					width: props.width,
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
		</>
	);
};

export default SearchField;

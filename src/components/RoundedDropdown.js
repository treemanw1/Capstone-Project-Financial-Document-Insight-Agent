import React from "react";
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	NativeSelect,
} from "@mui/material";

const RoundedDropdown = ({ label, options, value, onChange }) => {
	return (
		<Box>
			<TextField
				select
				label={label}
				value={value}
				onChange={onChange}
				variant="outlined"
				fullWidth
				sx={{
					borderRadius: "10px", // Adjust the border-radius as needed
				}}
			>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
		</Box>
	);
};

export default RoundedDropdown;

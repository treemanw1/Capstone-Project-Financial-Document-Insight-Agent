import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";

const DateDropdown = ({ props }) => {
	const [value, setValue] = useState("");
	return (
		<>
			<Typography sx={{ fontSize: "13px", color: "#757575" }}>
				{props.title}
			</Typography>
			<DatePicker
				// this function causing date picker render issues
				onChange={(e) => {
					console.log(e);
					setValue(e);
				}}
				label={value == "" ? props.label : ""}
				sx={{
					width: props.width,
					backgroundColor: "",
					color: "success.main",
					borderRadius: "40px",
					"& .MuiOutlinedInput-root": {
						borderRadius: "30px",
						height: "50px",
						fontSize: value == "" ? 0 : "15px",
					},
					"& .MuiFormLabel-root": {
						fontSize: "15px",
						mt: props.textOffset,
						ml: "6px",
					},
					"& .MuiInputBase-root": {
						height: props.height,
					},
				}}
				slots={{
					textField: (params) => (
						<TextField
							sx={{}}
							InputLabelProps={{ shrink: false }}
							{...params}
						/>
					),
				}}
			/>
		</>
	);
};

export default DateDropdown;

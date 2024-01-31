import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

const DateDropdown = ({ props }) => {
	return (
		<Box sx={{ background: "" }}>
			<Typography
				sx={{
					color: "#757575",
					mb: "5px",
					fontSize: props.titleFontSize,
				}}
			>
				{props.title}
			</Typography>
			<DatePicker
				label={props.date == null ? props.label : ""}
				value={props.date}
				onChange={props.onChange}
				renderInput={(params) => (
					<TextField
						InputLabelProps={{ shrink: false }}
						sx={{
							fontSize: "11px",
							width: props.width,
							"& .MuiOutlinedInput-root": {
								borderRadius: "30px",
								height: props.height,
								fontSize: props.inputFontSize,
							},
							"& .MuiFormLabel-root": {
								ml: "6px",
								color: "#333333",
								mt: props.mt,
								fontSize: props.inputFontSize,
							},
							"& .MuiInputBase-inputAdornedEnd": {
								ml: "6px",
								color: "#333333",
							},
						}}
						{...params}
					/>
				)}
			/>
		</Box>
	);
};

export default DateDropdown;

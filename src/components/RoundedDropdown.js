import { React, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography } from "@mui/material";

const RoundedDropdown = ({
	headerText,
	placeHolder,
	options,
	height,
	width,
	fontSize,
}) => {
	const [personName, setPersonName] = useState([]);

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value
		);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				// backgroundColor: "lightblue",
				height: height,
				width: width,
			}}
		>
			<Typography
				sx={{
					height: `calc(${fontSize} + 5px)`,
					fontSize: fontSize,
					color: "#757575",
					mb: "5px",
				}}
			>
				{headerText}
			</Typography>
			<FormControl
				sx={{
					width: "100%",
					height: `calc(100% - ${fontSize} - 10px)`, // Adjust for potential margins/paddings
					// backgroundColor: "lightgreen",
				}}
			>
				<Select
					displayEmpty
					value={personName}
					onChange={handleChange}
					input={<OutlinedInput />}
					renderValue={(selected) => {
						if (selected.length === 0) {
							return placeHolder;
						}
						return selected.join(", ");
					}}
					MenuProps={{
						PaperProps: {
							style: {
								maxHeight: 150,
								width: 250,
								backgroundColor: "#F1F1F1",
								borderRadius: "15px",
							},
						},
					}}
					inputProps={{ "aria-label": "Without label" }}
					sx={{
						borderRadius: "50px",
						fontSize: fontSize,
						// backgroundColor: "pink",
						height: "100%",
					}}
				>
					<MenuItem sx={{ fontSize: fontSize }} disabled value="">
						<em>{placeHolder}</em>
					</MenuItem>
					{options.map((name) => (
						<MenuItem
							sx={{ backgroundColor: "", fontSize: fontSize }}
							key={name}
							value={name}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default RoundedDropdown;

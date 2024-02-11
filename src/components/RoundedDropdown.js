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
	// height of RoundedDropdown will match parent Box height
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
				// backgroundColor: "lightblue",
				height: height,
				width: width,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Typography sx={{ fontSize: fontSize, color: "#757575" }}>
				{headerText}
			</Typography>
			<FormControl
				sx={{
					width: "100%",
					mt: "5px",
					// backgroundColor: "lightgreen",
					height: "100%",
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
						fontSize: "1.5vh",
						// backgroundColor: "pink",
						height: "100%",
					}}
				>
					<MenuItem disabled value="">
						<em>{placeHolder}</em>
					</MenuItem>
					{options.map((name) => (
						<MenuItem
							sx={{ backgroundColor: "" }}
							key={name}
							value={name}
							// style={getStyles(name, personName, theme)}
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

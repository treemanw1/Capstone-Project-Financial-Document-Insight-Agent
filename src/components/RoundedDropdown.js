import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
			backgroundColor: "#F1F1F1",
			borderRadius: "15px",
		},
	},
};

export default function RoundedDropdown({
	headerText,
	placeHolder,
	options,
	width,
	height,
}) {
	const theme = useTheme();
	const [personName, setPersonName] = React.useState([]);

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
				backgroundColor: "",
				width: width,
			}}
		>
			<Typography sx={{ fontSize: "10px", color: "#757575" }}>
				{headerText}
			</Typography>
			<FormControl sx={{ width: "100%", mt: "5px", backgroundColor: "" }}>
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
					MenuProps={MenuProps}
					inputProps={{ "aria-label": "Without label" }}
					sx={{
						borderRadius: "50px",
						height: height,
						fontSize: "11px",
						backgroundColor: "",
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
}

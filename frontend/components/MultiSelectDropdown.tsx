"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Typography } from "@mui/material";

interface MyComponentProps {
	headerText: string;
	placeHolder: string;
	height?: string;
	width: string;
	fontSize?: string;
	options: string[];
	selectedOptions: string[];
	setSelectedOptions: Dispatch<SetStateAction<string[]>>;
}

const MultiSelectDropdown: React.FC<MyComponentProps> = ({
	headerText,
	placeHolder,
	height = "7.5vh",
	width,
	fontSize = "1.5vh",
	options,
	selectedOptions,
	setSelectedOptions,
}) => {
	const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
		const {
			target: { value },
		} = event;
		setSelectedOptions(
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
					height: `calc(100% - ${fontSize} - 10px)`,
					// backgroundColor: "lightgreen",
				}}
			>
				<Select
					multiple
					value={selectedOptions}
					onChange={handleChange}
					input={<OutlinedInput />}
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
					{options.map((option) => (
						<MenuItem
							sx={{ backgroundColor: "", fontSize: fontSize }}
							key={option}
							value={option}
						>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default MultiSelectDropdown;

import React, { useState, Dispatch, SetStateAction } from "react";
import { Box, TextField, Typography, Autocomplete, Paper } from "@mui/material";
import { PaperProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface MyComponentProps {
	title: string;
	height: string;
	width: string;
	fontSize: string;
	options?: string[];
	onSelect: (newValue: string) => void;
}

const CustomPaper = (props: PaperProps) => {
	return (
		<Paper
			sx={{
				width: "fit-content",
				// height: "200px",
				background: "",
			}}
			{...props}
		/>
	);
};

const SearchField = ({
	title,
	height,
	width,
	fontSize,
	options = ["dummy1", "dummy2", "dummy3"],
	// setSelected,
	onSelect,
}: MyComponentProps) => {
	const theme = useTheme();

	const [value, setValue] = useState<string>("");
	const [inputValue, setInputValue] = useState<string>("");

	return (
		<Autocomplete
			disableCloseOnSelect
			options={options}
			sx={{
				width: width,
				height: "fit-content",
				// background: "pink",
			}}
			PaperComponent={CustomPaper}
			// value={value}
			inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			onChange={(event, newValue) => {
				if (newValue === null) return;
				setInputValue("");
				onSelect(newValue);
			}}
			renderInput={(params) => (
				<TextField
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						// background: "lightblue",
						background: theme.palette.primary.main,
						// height: height,
						borderColor: "transparent",
						borderRadius: "25px",
						"& fieldset": { border: "none" },
						"&:hover": { color: "black" },
						"& .Mui-focused": {
							color: "black",
							borderColor: "transparent",
						},
					}}
					{...params}
					InputLabelProps={{
						shrink: false,
						// ...params.InputLabelProps,
					}}
					label={inputValue ? "" : title}
				/>
			)}
		/>
	);
};

export default SearchField;

import React, { useState, Dispatch, SetStateAction } from "react";
import { Box, TextField, Typography, Autocomplete, Paper } from "@mui/material";
import { PaperProps } from "@mui/material";

interface MyComponentProps {
	title: string;
	height: string;
	width: string;
	fontSize: string;
	options?: string[];
	onSelect: (newValue: string) => void;
}

const CustomPaper = (props: PaperProps) => {
	return <Paper sx={{ width: "fit-content", background: "" }} {...props} />;
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
						background: "#E3E4E7",
						// height: height,
						borderColor: "transparent",
						borderRadius: "10px",
						"& fieldset": { border: "none" },
						"&:hover": { background: "" },
						"& .Mui-focused": {
							color: "#A3A4A8",
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

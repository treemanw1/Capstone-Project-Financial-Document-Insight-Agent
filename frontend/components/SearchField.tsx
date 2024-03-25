import React, { useState, Dispatch, SetStateAction } from "react";
import { Box, TextField, Typography, Autocomplete, Paper } from "@mui/material";
import { PaperProps } from "@mui/material";

interface MyComponentProps {
	title: string;
	height: string;
	width: string;
	fontSize: string;
	options?: string[];
	// setSelected: Dispatch<SetStateAction<T[]>>;
	onSelect: (newValue: string) => void;
}

const CustomPaper = (props: PaperProps) => {
	return <Paper sx={{ width: "fit-content" }} {...props} />;
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
				height: height,
			}}
			PaperComponent={CustomPaper}
			value={value}
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
					{...params}
					// InputLabelProps={{
					// 	...params.InputLabelProps,
					// 	style: { color: "black" },
					// }}
					label={title}
				/>
			)}
		/>
	);
};

export default SearchField;

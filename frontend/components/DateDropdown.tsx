import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, TextField, Typography } from "@mui/material";

interface MyObjectProp {
	title: string;
	label: string;
	date: Date | null;
	height: string;
	width: string;
	mt: string;
	fontSize: string;
	onChange: (date: Date | null) => void;
}

interface MyComponentProps {
	props: MyObjectProp;
}

const DateDropdown: React.FC<MyComponentProps> = ({ props }) => {
	return (
		<DatePicker
			label={props.date == null ? props.label : ""}
			value={props.date}
			onChange={props.onChange}
			renderInput={(params) => (
				<TextField
					InputLabelProps={{ shrink: false }}
					sx={{
						fontSize: props.fontSize,
						width: props.width,
						// background: "pink",
						"& fieldset": { border: "none" },
						"&:hover": { background: "" },
						"& .MuiOutlinedInput-root": {
							background: "#E3E4E7",
							borderColor: "transparent",
							borderRadius: "10px",
							// height: `calc(100% - ${props.fontSize} - 10px)`,
							// fontSize: props.fontSize,
						},
						"& .MuiFormLabel-root": {
							// ml: "6px",
							// color: "#333333",
						},
						"& .MuiInputBase-inputAdornedEnd": {
							height: "100%",
							// ml: "6px",
							// color: "#333333",
						},
					}}
					{...params}
				/>
			)}
		/>
		// <Box sx={{ background: "", height: props.height }}>
		// 	<DatePicker
		// 		label={props.date == null ? props.label : ""}
		// 		value={props.date}
		// 		onChange={props.onChange}
		// 		renderInput={(params) => (
		// 			<TextField
		// 				InputLabelProps={{ shrink: false }}
		// 				sx={{
		// 					fontSize: props.fontSize,
		// 					width: props.width,
		// 					height: "100%",
		// 					"& .MuiOutlinedInput-root": {
		// 						// borderRadius: "30px",
		// 						// height: `calc(100% - ${props.fontSize} - 10px)`,
		// 						fontSize: props.fontSize,
		// 					},
		// 					"& .MuiFormLabel-root": {
		// 						// ml: "6px",
		// 						// color: "#333333",
		// 					},
		// 					"& .MuiInputBase-inputAdornedEnd": {
		// 						height: "100%",
		// 						// ml: "6px",
		// 						// color: "#333333",
		// 					},
		// 				}}
		// 				{...params}
		// 			/>
		// 		)}
		// 	/>
		// </Box>
	);
};

export default DateDropdown;

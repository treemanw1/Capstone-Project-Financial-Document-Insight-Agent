import React from "react";
import { Box, TextField, Typography } from "@mui/material";

interface MyObjectProp {
	title: string;
	height: string;
	width: string;
	fontSize: string;
}

interface MyComponentProps {
	props: MyObjectProp;
}

const SearchField: React.FC<MyComponentProps> = ({ props }) => {
	return (
		<Box
			sx={{
				// background: "pink",
				width: props.width,
				height: props.height,
			}}
		>
			<Typography
				sx={{
					height: `calc(${props.fontSize} + 5px)`,
					fontSize: props.fontSize,
					color: "#757575",
					mb: "5px",
				}}
			>
				{props.title}
			</Typography>
			<TextField
				inputProps={{ style: { fontSize: props.fontSize } }}
				sx={{
					width: "100%",
					color: "success.main",
					height: "100%",
					borderRadius: "40px",
					"& .MuiOutlinedInput-root": {
						borderRadius: "50px",
					},
					"& .MuiInputBase-root": {
						height: `calc(100% - ${props.fontSize} - 10px)`,
					},
				}}
			></TextField>
		</Box>
	);
};

export default SearchField;

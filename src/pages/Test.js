import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDropdown from "../components/RoundedDropdown";
import {
	Box,
	Divider,
	Typography,
	FormControl,
	InputLabel,
	NativeSelect,
	Button,
} from "@mui/material";
import { globalStyles } from "../GlobalStyles";

const Test = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				maxHeight: "100vh",
				justifyContent: "space-between",
				backgroundColor: "",
			}}
		>
			<Header />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					mx: globalStyles.mx,
					backgroundColor: "pink",
					height: `${
						100 -
						globalStyles.footerHeight -
						globalStyles.headerHeight
					}vh`,
				}}
			>
				<Typography>Advanced Search</Typography>
				<RoundedDropdown
					headerText="Hello"
					placeHolder="Placeholder"
					options={["Type 1", "Type 2", "Type 3"]}
					width="300px"
					height="30px"
				/>
				<Box
					sx={{
						flex: 1,
						height: "10px",
						background: "lightblue",
					}}
				/>
				<Box
					sx={{
						flex: 1,
						height: "10px",
						background: "red",
					}}
				/>
			</Box>
			<Footer />
		</Box>
	);
};

export default Test;

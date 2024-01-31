import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDropdown from "../components/RoundedDropdown";
import { Box, Button, TextField } from "@mui/material";
import { globalStyles } from "../GlobalStyles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import DateDropdown from "../components/DateDropdown";
import SearchField from "../components/SearchField";

const Test = () => {
	const [value, setValue] = useState("");
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
					backgroundColor: "",
					height: `${
						100 -
						globalStyles.footerHeight -
						globalStyles.headerHeight
					}vh`,
				}}
			>
				<DateDropdown
					props={{
						title: "Select start date",
						label: "Start Date",
						width: 450,
						height: "40px",
						textOffset: "-5px",
					}}
				/>
				<SearchField
					props={{
						title: "Search for keyword",
						width: 500,
						height: "40px",
					}}
				/>
			</Box>
			<Footer />
		</Box>
	);
};

export default Test;

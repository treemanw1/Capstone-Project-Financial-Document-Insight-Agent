import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDropdown from "../components/RoundedDropdown";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { globalStyles } from "../GlobalStyles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import DateDropdown from "../components/DateDropdown";
import SearchField from "../components/SearchField";

const Test = () => {
	const [date, setDate] = useState(null);
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
					justifyContent: "space-between",
				}}
			>
				<Typography
					lineHeight={1.1}
					sx={{ mt: "20px", fontSize: "3vh" }}
				>
					Advanced Search
				</Typography>
			</Box>
			<Footer />
			{/* <DateDropdown
					props={{
						title: "Select start date",
						label: "Start Date",
						date: date,
						onChange: (d) => setDate(d),
						width: "400px",
						height: "45px",
						mt: "-4px",
					}}
				/>
				<SearchField
					props={{
						title: "Search for keyword",
						width: 500,
						height: "50px",
						fontSize: "13px",
					}}
				/> */}
		</Box>
	);
};

export default Test;

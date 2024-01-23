import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoundedDropdown from "./components/RoundedDropdown";
import {
	Box,
	Divider,
	Typography,
	FormControl,
	InputLabel,
	NativeSelect,
} from "@mui/material";
import { globalStyles } from "./GlobalStyles";

export const Home = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				backgroundColor: "",
			}}
		>
			<Header />
			<Box sx={{ mx: globalStyles.mx, backgroundColor: "", flex: 1 }}>
				<Box sx={{ width: "35%", mt: "5vh" }}>
					<Typography
						lineHeight={1.1}
						sx={{
							fontSize: "55px",
							backgroundColor: "",
						}}
					>
						Find documents within minutes.
					</Typography>
					<Divider sx={{ height: "15px", width: 0 }} />
					<Typography sx={{ fontSize: "16px", width: "100%" }}>
						Search using keyword and/or phrases to quickly
						streamline documents for the references you need.
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						mt: "20px",
						backgroundColor: "",
					}}
				>
					<RoundedDropdown
						headerText="Select document type"
						placeHolder={"Document Type"}
						options={["Type 1", "Type 2", "Type 3"]}
						width="fit-content"
					/>
				</Box>
				<Typography sx={{ fontSize: "12pt", mt: "15px" }}>
					Your recent searches
				</Typography>
			</Box>
			<Footer />
		</Box>
	);
};

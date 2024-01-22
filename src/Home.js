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
				minHeight: "110vh",
			}}
		>
			<Header />
			<Box sx={{ mx: globalStyles.mx, backgroundColor: "", flex: 1 }}>
				<Box sx={{ width: "45%", mt: "7.5vh" }}>
					<Typography lineHeight={1.1} sx={{ fontSize: "65px" }}>
						Find documents within minutes.
					</Typography>
					<Divider sx={{ height: "15px", width: 0 }} />
					<Typography sx={{ fontSize: "20px", width: "85%" }}>
						Search using keyword and/or phrases to quickly
						streamline documents for the references you need.
					</Typography>
				</Box>
				<Box sx={{ mt: "20px" }}>
					{/* <RoundedDropdown
						label="Document Type"
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						onChange={(event) => {
							console.log(event);
						}}
					/> */}

					<FormControl variant="outlined" fullWidth>
						<InputLabel
							variant="standard"
							htmlFor="uncontrolled-native"
						>
							Select document type
						</InputLabel>
						<NativeSelect
							defaultValue={1}
							inputProps={{
								name: "age",
								id: "uncontrolled-native",
							}}
							sx={{ borderRadius: "50px", height: "50px" }}
						>
							<option value={1}>Document Type</option>
						</NativeSelect>
					</FormControl>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
};

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDropdown from "../components/RoundedDropdown";
import RoundButton from "../components/RoundButton";
import ReportButton from "../components/ReportButton";
import { Box, Divider, Typography, TextField } from "@mui/material";
import SearchField from "../components/SearchField";
import { globalStyles } from "../GlobalStyles";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				backgroundColor: "",
				justifyContent: "space-between",
			}}
		>
			<Header />
			<Box
				sx={{
					mx: globalStyles.mx,
					backgroundColor: "",
					display: "flex",
					flexGrow: 1,
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<Box sx={{ backgroundColor: "" }}>
					<Box
						sx={{
							width: "750px",
							mt: "3.5vh",
							backgroundColor: "",
						}}
					>
						<Typography
							lineHeight={1.1}
							sx={{
								fontSize: "55px",
								backgroundColor: "",
							}}
						>
							Find documents within minutes.
						</Typography>
						<Typography
							sx={{ fontSize: "16px", width: "100%", mt: "5px" }}
						>
							Search using keyword and/or phrases to quickly
							streamline documents for the references you need.
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							mt: "20px",
							// backgroundColor: "pink",
							alignItems: "flex-end",
							justifyContent: "space-between",
						}}
					>
						<RoundedDropdown
							headerText="Select document type"
							placeHolder={"Document Type"}
							options={["Type 1", "Type 2", "Type 3"]}
							width="25%"
							height="9vh"
							fontSize="1.75vh"
						/>
						<SearchField
							props={{
								title: "Search for keywords and/or phrases",
								height: "9vh",
								width: "57.5%",
								fontSize: "1.75vh",
							}}
						/>
						<RoundButton
							props={{
								text: "Search",
								height: "6vh",
								width: "15%",
							}}
							onClick={() => navigate("/results-page")}
						/>
					</Box>
				</Box>
				<Box sx={{ backgroundColor: "", mb: "30px" }}>
					<Box sx={{ backgroundColor: "" }}>
						<Typography
							sx={{ fontSize: "16px", mt: "15px", mb: "7.5px" }}
						>
							Your recent searches
						</Typography>
						<Box sx={{ display: "flex", gap: 2 }}>
							<RoundButton
								props={{
									text: "Company Announcements: Dymon",
									width: "fit-content",
									fontSize: "13px",
								}}
							/>
							<RoundButton
								props={{
									text: "IPO Prospectus + Catalodge: Conflict of Interest",
									width: "fit-content",
									fontSize: "13px",
								}}
							/>
							<RoundButton
								props={{
									text: "Company Announcements: Dymon",
									width: "fit-content",
									fontSize: "13px",
								}}
							/>
						</Box>
					</Box>
					<Box
						sx={{
							backgroundColor: "",
							flex: 1,
						}}
					>
						<Typography
							sx={{ fontSize: "16px", mt: "15px", mb: "7.5px" }}
						>
							Your recent saved reports
						</Typography>
						<Box sx={{ display: "flex", gap: 2 }}>
							<ReportButton
								style={{
									text: "Research for General Motors IPO Submission",
									width: "250px",
									fontSize: "13px",
								}}
							/>
							<ReportButton
								style={{
									text: "Research for General Motors IPO Submission",
									width: "250px",
									fontSize: "13px",
								}}
							/>
							<ReportButton
								style={{
									text: "Research for General Motors IPO Submission",
									width: "250px",
									fontSize: "13px",
								}}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
};

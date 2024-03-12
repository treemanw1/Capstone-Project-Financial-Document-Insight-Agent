"use client";

import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import RoundedDropdown from "@components/RoundedDropdown";
import RoundButton from "@components/RoundButton";
import ReportButton from "@components/ReportButton";
import { Box, Typography } from "@mui/material";
import SearchField from "@components/SearchField";
import { globalStyles } from "styles";
import { useRouter } from "next/navigation";
import { NextRouter } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const styles = {
	fontSize: "1.75vh",
};

const onSearch = () => {
    
}

const Home = () => {
	const router = useRouter();
	useEffect(() => {
		router.prefetch("/advanced-search");
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				// backgroundColor: "pink",
				justifyContent: "space-between",
			}}
		>
			<Header />
			<Box
				sx={{
					mx: globalStyles.mx,
					// mx: "6%",
					// backgroundColor: "pink",
					display: "flex",
					flexGrow: 1,
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Box sx={{ backgroundColor: "", mb: 20 }}>
					<Box
						sx={{
							width: "100%",
							mt: "3.5vh",
							backgroundColor: "",
						}}
					>
						<Typography
							lineHeight={1.1}
							sx={{
								fontSize: "60px",
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
							text="Search"
							height="6vh"
							width="15%"
							fontSize={styles.fontSize}
							onClick={() => onSearch()}
						/>
					</Box>
				</Box>
				{/* <Box sx={{ backgroundColor: "", mb: "30px" }}>
					<Box sx={{ backgroundColor: "" }}>
						<Typography
							sx={{ fontSize: "16px", mt: "15px", mb: "7.5px" }}
						>
							Your recent searches
						</Typography>
						<Box sx={{ display: "flex", gap: 2 }}>
							<RoundButton
								text="Company Announcements: Dymon"
								width="fit-content"
								fontSize={styles.fontSize}
							/>
							<RoundButton
								text="IPO Prospectus + Catalodge: Conflict of Interest"
								width="fit-content"
								fontSize={styles.fontSize}
							/>
							<RoundButton
								text="Company Announcements: Dymon"
								width="fit-content"
								fontSize={styles.fontSize}
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
								text="Research for General Motors IPO Submission"
								width="250px"
								fontSize={styles.fontSize}
								noDocuments={5}
							/>
							<ReportButton
								text="Research for General Motors IPO Submission"
								width="250px"
								fontSize={styles.fontSize}
								noDocuments={5}
							/>
							<ReportButton
								text="Research for General Motors IPO Submission"
								width="250px"
								fontSize={styles.fontSize}
								noDocuments={5}
							/>
						</Box>
					</Box>
				</Box> */}
			</Box>
			<Footer />
		</Box>
	);
};

export default Home;

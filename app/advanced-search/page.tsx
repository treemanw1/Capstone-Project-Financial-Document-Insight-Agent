"use client";

import React, { use } from "react";
import { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";

import Header from "@components/Header";
import Footer from "@components/Footer";
import RoundedDropdown from "@components/RoundedDropdown";
import RoundButton from "@components/RoundButton";
import SearchField from "@components/SearchField";
import DateDropdown from "@components/DateDropdown";
import { globalStyles } from "@components/GlobalStyles";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useRouter } from "next/navigation";

const styles = {
	fontSize: "1.5vh",
	barWidth: 36, // vh
	barHeight: "7.5vh",
};

const AdvancedSearch = () => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const router = useRouter();

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
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
						background: "",
						display: "flex",
						flexDirection: "column",
						mx: globalStyles.mx,
						backgroundColor: "",
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
						sx={{
							mt: "20px",
							fontSize: "3vh",
							background: "",
						}}
					>
						Advanced Search
					</Typography>

					<Box sx={{ background: "" }}>
						<Typography
							sx={{
								fontSize: "2.2vh",
								mb: "6px",
							}}
						>
							Document Type
						</Typography>
						<Box
							sx={{
								display: "flex",
								background: "",
								height: "8vh",
							}}
						>
							<RoundedDropdown
								headerText="Select document type"
								placeHolder="Document Type"
								options={["Type 1", "Type 2", "Type 3"]}
								width={styles.barWidth + "vh"}
								height={styles.barHeight}
								fontSize={styles.fontSize}
							/>
							<Divider sx={{ width: 0, mr: "15px" }} />
							<RoundedDropdown
								headerText={"Select document sub-type"}
								placeHolder={"Document Sub-type"}
								options={["Type 1", "Type 2", "Type 3"]}
								width={styles.barWidth + "vh"}
								height={styles.barHeight}
								fontSize={styles.fontSize}
							/>
						</Box>
					</Box>

					<Box sx={{ background: "" }}>
						<Typography sx={{ fontSize: "2.2vh", mb: "6px" }}>
							Date Range
						</Typography>
						<Box
							sx={{
								display: "flex",
								height: "8vh",
							}}
						>
							<RoundedDropdown
								headerText={"Select date type"}
								placeHolder={"Date Type"}
								options={["Type 1", "Type 2", "Type 3"]}
								width={styles.barWidth + "vh"}
								height={styles.barHeight}
								fontSize={styles.fontSize}
							/>
							<Divider sx={{ width: 0, mr: "15px" }} />
							<DateDropdown
								props={{
									title: "Select start date",
									label: "Start Date",
									date: startDate,
									onChange: (d) => setStartDate(d),
									width: styles.barWidth + "vh",
									height: styles.barHeight,
									mt: "-6px",
									fontSize: styles.fontSize,
								}}
							/>
							<Divider sx={{ width: 0, mr: "15px" }} />
							<DateDropdown
								props={{
									title: "Select end date",
									label: "End Date",
									date: endDate,
									onChange: (d) => setEndDate(d),
									width: styles.barWidth + "vh",
									height: styles.barHeight,
									mt: "-6px",
									fontSize: styles.fontSize,
								}}
							/>
						</Box>
					</Box>

					<Box sx={{ background: "", height: "12vh" }}>
						<Typography
							sx={{
								flex: 1,
								fontSize: "2.2vh",
								mb: "6px",
							}}
						>
							Status
						</Typography>
						<RoundedDropdown
							headerText={"Select Status"}
							placeHolder={"Status"}
							options={["Type 1", "Type 2", "Type 3"]}
							width={styles.barWidth + "vh"}
							height={styles.barHeight}
							fontSize={styles.fontSize}
						/>
					</Box>

					<Box sx={{ background: "", mb: "" }}>
						<Typography
							sx={{
								fontSize: "2.2vh",
								mb: "6px",
							}}
						>
							Search Keywords and/or Phrases
						</Typography>
						<Box
							sx={{
								display: "flex",
								mb: "8px",
							}}
						>
							<SearchField
								props={{
									title: "Search for keyword",
									fontSize: styles.fontSize,
									width: `calc(
									${styles.barWidth * 2}vh + 15px
								)`,
									height: styles.barHeight,
								}}
							/>
							<Divider sx={{ width: 0, mr: "15px" }} />
							<RoundedDropdown
								headerText={"Where keyword is found"}
								placeHolder={"Please select "}
								options={["Type 1", "Type 2", "Type 3"]}
								width={styles.barWidth + "vh"}
								height={styles.barHeight}
								fontSize={styles.fontSize}
							/>
						</Box>
						<Box
							sx={{
								display: "flex",
							}}
						>
							<SearchField
								props={{
									title: "Search for phrases",
									fontSize: styles.fontSize,
									width: `calc(
									${styles.barWidth * 2}vh + 15px
								)`,
									height: styles.barHeight,
								}}
							/>
							<Divider sx={{ width: 0, mr: "15px" }} />
							<RoundedDropdown
								headerText={"Where phrases is found"}
								placeHolder={"Please select "}
								options={["Type 1", "Type 2", "Type 3"]}
								width={styles.barWidth + "vh"}
								height={styles.barHeight}
								fontSize={styles.fontSize}
							/>
						</Box>
					</Box>
					<RoundButton
						text="Search"
						height="5vh"
						width="30vh"
						fontSize="2vh"
						onClick={() => {
							router.push("/results-page");
						}}
					/>
				</Box>
				<Box sx={{ height: "5vh", background: "" }} />
				<Footer />
			</Box>
		</LocalizationProvider>
	);
};

export default AdvancedSearch;

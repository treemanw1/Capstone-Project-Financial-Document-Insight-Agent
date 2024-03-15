"use client";

import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import RoundedDropdown from "@components/RoundedDropdown";
import RoundButton from "@components/RoundButton";
import DateDropdown from "@components/DateDropdown";
import ReportButton from "@components/ReportButton";
import { Box, Typography, Select } from "@mui/material";
import SearchField from "@components/SearchField";
import { globalStyles } from "styles";
import { useRouter } from "next/navigation";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PDF } from "interfaces";
import { get, post } from "utils";

const styles = {
	fontSize: "2vh",
	barWidth: 36, // vh
	barHeight: "10vh",
};

const Filter = () => {
	const token = localStorage.getItem("jwtToken");
	const router = useRouter();

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [companyNames, setCompanyNames] = useState<string[]>([]);

	useEffect(() => {
		get(
			token,
			"/get-company-names",
			"Failed to fetch company names.",
			(company_names: any) => {
				console.log("company names: ", company_names);
				setCompanyNames(company_names);
			}
		);
	}, []);

	const onSearch = () => {
		post(
			token,
			{
				start_date: startDate,
				end_date: endDate,
				companies: companyNames,
			},
			"/search",
			"Failed to search for pdfs.",
			(pdfs) => {
				console.log(pdfs);
				const pdf_ids = pdfs.map((pdf: PDF) => pdf.id);
				console.log("pdf_ids: ", pdf_ids);
				post(
					token,
					{ pdf_ids },
					"/create-session",
					"Failed to create session.",
					(session_id) => {
						router.push(`/chat/${session_id}`);
					}
				);
			}
		);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
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
					<Box sx={{ backgroundColor: "", mb: 2 }}>
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
								Filter down your set of documents.
							</Typography>
							<Typography
								sx={{
									fontSize: "16px",
									width: "100%",
									mt: "5px",
								}}
							>
								Reduce down your set of documents to be searched
								on for better results.
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								mt: "20px",
								// backgroundColor: "pink",
								// gap: 2,
								alignItems: "flex-end",
								// height: "15vh",
								gap: 2,
								// justifyContent: "space-between",
							}}
						>
							<RoundedDropdown
								headerText="Companies"
								placeHolder=""
								// options={["steve", "apple", "microsoft"]}
								options={companyNames}
								width={styles.barWidth + "vh"}
								height={styles.barHeight}
								fontSize={styles.fontSize}
								multiple={true}
							/>
							<DateDropdown
								props={{
									title: "Select start date",
									label: "Start Date",
									date: startDate,
									onChange: (d) => setStartDate(d),
									width: styles.barWidth + "vh",
									height: styles.barHeight,
									mt: "-3px",
									fontSize: styles.fontSize,
								}}
							/>
							<DateDropdown
								props={{
									title: "Select end date",
									label: "End Date",
									date: endDate,
									onChange: (d) => setEndDate(d),
									width: styles.barWidth + "vh",
									height: styles.barHeight,
									mt: "-3px",
									fontSize: styles.fontSize,
								}}
							/>
							<RoundButton
								text="Search"
								height="7vh"
								width="15%"
								fontSize={styles.fontSize}
								onClick={() => onSearch()}
							/>
						</Box>
					</Box>
					{/* <Box sx={{ background: "lightblue" }}>
						<Typography>Selected companies</Typography>
					</Box> */}
				</Box>
				<Footer />
			</Box>
		</LocalizationProvider>
	);
};

export default Filter;

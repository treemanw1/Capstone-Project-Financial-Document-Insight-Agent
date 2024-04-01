"use client";

import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import RoundButton from "@components/RoundButton";
import MultiSelectDropdown from "@components/MultiSelectDropdown";
import DateDropdown from "@components/DateDropdown";
import { Box, Container, Divider, Typography, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { globalStyles } from "styles";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PDF } from "interfaces";
import { get, post } from "utils/rest_utils";
import SearchField from "@components/SearchField";

const styles = {
	fontSize: "2vh",
	barWidth: 43, // vh
	barHeight: "7vh",
};

const Filter = () => {
	const token =
		typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
	const router = useRouter();
	const theme = useTheme();

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [companyNames, setCompanyNames] = useState<string[]>([]);
	const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

	const [pdfs, setPdfs] = useState<PDF[]>([]);
	const [selectedPDFs, setSelectedPDFs] = useState<PDF[]>([]);

	useEffect(() => {
		router.prefetch("/chat");
		get(
			token,
			"/get-company-names",
			"Failed to fetch company names.",
			(company_names: any) => {
				setCompanyNames(company_names);
			}
		);
		get(token, "/get-all-pdfs", "Failed to fetch PDFs.", (pdfs) => {
			setPdfs(pdfs);
		});
	}, []);

	const addDocuments = () => {
		post(
			token,
			{
				start_date: startDate,
				end_date: endDate,
				companies: [...selectedCompanies],
			},
			"/search",
			"Failed to find pdfs.",
			(pdfs) => {
				const pdf_ids = pdfs.map((pdf: PDF) => pdf.id);
				const pdf_names = pdfs.map((pdf: PDF) => pdf.pdf_document_name);
				setSelectedPDFs((prevPDFs: PDF[]) => {
					const set = new Set([...pdfs, ...prevPDFs]);
					return [...set];
				});
				setSelectedCompanies([]);
			}
		);
	};

	const createSession = () => {
		post(
			token,
			[...selectedPDFs].map((pdf) => pdf.id),
			"/create-session",
			"Failed to create session.",
			(session_id) => {
				router.push(`/chat`);
			}
		);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					// #04223E #1A88C5
					// height: `calc(100vh-${globalStyles.headerHeight}-${globalStyles.footerHeight})`,
					height: "100vh",
					width: "100vw",
					// background:
					// 	"linear-gradient(to right bottom, #BB84F8, #FEBF87)",
					// background:
					// 	"linear-gradient(to right bottom, #A9F0DE, #FFBABB)",
					// background:
					// 	"linear-gradient(to right bottom, #04223E, #1A88C5)",
					// background: "white",
					justifyContent: "space-between",
					alignItems: "center",
					// color: "#f1f1ff",
				}}
			>
				<Header />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						textAlign: "center",
						width: "60vw",
						// background: "pink",
					}}
				>
					<Typography variant="h2">
						Find documents within minutes
					</Typography>
					<Typography>
						Search using document names and/or filters to quickly
						streamline documents for the references you need.
					</Typography>
					{/* <Typography>
						Start your conversation by selecting the documents you
						want to explore
					</Typography> */}
					<Typography
						variant="body1"
						// textAlign="left"
						sx={{ mt: 2, mb: 1 }}
					>
						Search for documents by name
					</Typography>
					<SearchField
						title="Document Name"
						height={styles.barHeight}
						width="100%"
						fontSize={styles.fontSize}
						onSelect={(newValue: string) => {
							const pdf = pdfs.find(
								(pdf) => pdf.pdf_document_name === newValue
							)!;
							setSelectedPDFs([...selectedPDFs, pdf]);
						}}
						options={pdfs.map((pdf) => pdf.pdf_document_name)}
					/>
					<Typography
						variant="body1"
						// textAlign="left"
						sx={{ mt: 2, mb: 1 }}
					>
						Or find documents with filters
					</Typography>
					<Box
						sx={{
							display: "flex",
							gap: 2,
							height: "35vh",
							// background: "lightblue",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								gap: 1,
								width: "35%",
								// background: "green",
								height: "100%",
							}}
						>
							<SearchField
								title="Search companies by name"
								height={styles.barHeight}
								width="100%"
								fontSize={styles.fontSize}
								onSelect={(newValue: string) => {
									setSelectedCompanies([
										...selectedCompanies,
										newValue,
									]);
								}}
								options={companyNames}
							/>
							<DateDropdown
								props={{
									title: "Select start date",
									label: "Select Start Date",
									date: startDate,
									onChange: (d) => setStartDate(d),
									width: "100%",
									height: styles.barHeight,
									mt: "-3px",
									fontSize: styles.fontSize,
								}}
							/>
							<DateDropdown
								props={{
									title: "Select end date",
									label: "Select End Date",
									date: endDate,
									onChange: (d) => setEndDate(d),
									width: "100%",
									height: styles.barHeight,
									mt: "-3px",
									fontSize: styles.fontSize,
								}}
							/>
							<RoundButton
								text="Add documents"
								height="6vh"
								width="100%"
								fontSize={styles.fontSize}
								onClick={() => {
									if (
										startDate === null &&
										endDate === null &&
										selectedCompanies.length === 0
									) {
										alert(
											"Please enter at least 1 search field before adding documents."
										);
										return;
									}
									addDocuments();
								}}
							/>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
								background: theme.palette.primary.main,
								height: "100%",
								flex: 1,
								borderRadius: 3,
								color: "black",
								overflow: "auto",
								"&::-webkit-scrollbar": {
									backgroundColor: theme.palette.primary.main,
									width: "14px",
								},
								"&::-webkit-scrollbar-track": {
									backgroundColor:
										theme.palette.primary.light,
								},
								"&::-webkit-scrollbar-thumb": {
									background: theme.palette.primary.dark,
									borderRadius: "16px",
									border: `4px solid ${theme.palette.primary.light}`,
								},
								"&::-webkit-scrollbar-button": {
									display: "none",
								},
							}}
						>
							<Box sx={{ p: 2 }}>
								{selectedPDFs.map((pdf, index) => (
									<Box
										key={index}
										sx={{
											display: "flex",
											alignItems: "center",
											// background: "pink",
											height: "fit-content",
											justifyContent: "space-between",
										}}
									>
										<Typography
											textAlign="left"
											variant="caption"
											whiteSpace="nowrap"
											textOverflow="ellipsis"
											overflow="clip"
											sx={{ width: "90%" }}
										>
											{pdf.pdf_document_name}
										</Typography>
										<IconButton
											size="small"
											disableRipple
											onClick={() =>
												setSelectedPDFs(
													selectedPDFs.filter(
														(item) => item != pdf
													)
												)
											}
										>
											<Delete
												sx={{
													"&: hover": {
														color: "#900018",
													},
												}}
												// sx={{ fontSize: "3vh" }}
											/>
										</IconButton>
									</Box>
								))}
							</Box>
						</Box>
					</Box>
				</Box>
				<RoundButton
					text="Start your conversation"
					height="6vh"
					width={styles.barWidth + "vh"}
					fontSize={styles.fontSize}
					onClick={() => {
						if (selectedPDFs.length === 0) {
							alert(
								"Please select at least one document to start a chat session."
							);
							return;
						}
						createSession();
					}}
				/>
				<Footer />
			</Box>
		</LocalizationProvider>
	);
};

export default Filter;

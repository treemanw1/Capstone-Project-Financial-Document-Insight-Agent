"use client";

import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import RoundButton from "@components/RoundButton";
import MultiSelectDropdown from "@components/MultiSelectDropdown";
import DateDropdown from "@components/DateDropdown";
import { Box, Divider, Typography, IconButton } from "@mui/material";
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
					// minHeight: "100vh",
					height: "100vh",
					// backgroundColor: "pink",
					justifyContent: "space-between",
				}}
			>
				<Header />
				<Box
					sx={{
						mx: globalStyles.mx,
						// background: "lightblue",
						display: "flex",
						flexGrow: 1,
						justifyContent: "space-between",
					}}
				>
					<Box
						sx={{
							display: "flex",
							width: "100%",
							alignItems: "center",
							justifyContent: "space-between",
							// background: "pink",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								// background: "lightblue",
								justifyContent: "space-between",
								height: "70vh",
								width: "45vw",
							}}
						>
							<Typography
								variant="h4"
								lineHeight={1.1}
								sx={{
									backgroundColor: "",
									mb: 1,
								}}
							>
								Search for documents
							</Typography>
							<Box
								sx={{
									display: "flex",
									gap: 1,
									mb: 3,
								}}
							>
								<SearchField
									title="Search documents by name"
									height={styles.barHeight}
									width="100%"
									fontSize={styles.fontSize}
									onSelect={(newValue: string) => {
										const pdf = pdfs.find(
											(pdf) =>
												pdf.pdf_document_name ===
												newValue
										)!;
										setSelectedPDFs([...selectedPDFs, pdf]);
									}}
									options={pdfs.map(
										(pdf) => pdf.pdf_document_name
									)}
								/>
							</Box>
							<Typography
								variant="h4"
								lineHeight={1.1}
								sx={{
									backgroundColor: "",
								}}
							>
								Find documents through filters
							</Typography>
							<Box
								sx={{
									display: "flex",
									mt: 1,
									// background: "pink",
									justifyContent: "space-between",
									height: "44vh",
								}}
							>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										width: "47.5%",
									}}
								>
									<Box
										sx={{
											height: "5vh",
											// background: "lightblue",
										}}
									/>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "space-between",
											// background: "lightblue",
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
												onChange: (d) =>
													setStartDate(d),
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
										<Box sx={{}}>
											<RoundButton
												text="Add documents"
												height="6vh"
												width="100%"
												fontSize={styles.fontSize}
												onClick={() => {
													if (
														startDate === null &&
														endDate === null &&
														selectedCompanies.length ===
															0
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
									</Box>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										width: "47.5%",
										// background: "lightgreen",
									}}
								>
									<Box
										sx={{
											height: "5vh",
											// background: "lightblue",
										}}
									>
										<Typography
											variant="h6"
											sx={{ width: "100%" }}
										>
											Companies selected (
											{selectedCompanies.length})
										</Typography>
									</Box>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											border: 1,
											borderColor: "#C4C4C4",
											overflow: "auto",
											height: "100%",
											borderRadius: "10px",
											p: 2,
											// background: "pink",
											"&::-webkit-scrollbar": {
												backgroundColor:
													theme.palette.primary.main,
												width: "14px",
											},
											"&::-webkit-scrollbar-track": {
												backgroundColor:
													theme.palette.primary.light,
											},
											"&::-webkit-scrollbar-thumb": {
												background:
													theme.palette.primary.dark,
												borderRadius: "16px",
												border: `4px solid ${theme.palette.primary.light}`,
											},
											"&::-webkit-scrollbar-button": {
												display: "none",
											},
										}}
									>
										{selectedCompanies.map(
											(company, index) => (
												<Box
													key={index}
													sx={{
														display: "flex",
														alignItems: "center",
														// background: "pink",
														height: "fit-content",
														justifyContent:
															"space-between",
													}}
												>
													<Typography variant="body2">
														{company}
													</Typography>
													<IconButton
														size="small"
														disableRipple
														onClick={() =>
															setSelectedCompanies(
																selectedCompanies.filter(
																	(item) =>
																		item !=
																		company
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
											)
										)}
									</Box>
								</Box>
							</Box>
						</Box>
						<Divider sx={{ width: 0, ml: "2.5vw" }} />
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								height: "70vh",
								width: "45vw",
							}}
						>
							<Typography
								variant="h4"
								lineHeight={1.1}
								sx={{
									backgroundColor: "",
									mb: 1,
								}}
							>
								Selected documents
							</Typography>
							<Box
								sx={{
									border: 1,
									borderColor: "#C4C4C4",
									borderRadius: "10px",
									p: 2,
									height: "100%",
									overflow: "auto",
									my: 1,
									"&::-webkit-scrollbar": {
										backgroundColor:
											theme.palette.primary.main,
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
										<Typography variant="body2">
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
							<Divider sx={{ width: 0, mt: 1 }} />
							<RoundButton
								text="Start Chat Session"
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
						</Box>
					</Box>
				</Box>
				<Footer />
			</Box>
		</LocalizationProvider>
	);
};

export default Filter;

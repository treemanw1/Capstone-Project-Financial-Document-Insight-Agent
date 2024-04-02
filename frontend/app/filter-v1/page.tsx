"use client";

import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import RoundButton from "@components/RoundButton";
import MultiSelectDropdown from "@components/MultiSelectDropdown";
import DateDropdown from "@components/DateDropdown";
import {
	Box,
	Container,
	Divider,
	TextField,
	Link,
	Typography,
	IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { globalStyles } from "styles";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NextLink from "next/link";
import { PDF } from "interfaces";
import { get, post } from "utils/rest_utils";
import SearchField from "@components/SearchField";

const styles = {
	fontSize: "2vh",
	barWidth: 43, // vh
	barHeight: "7vh",
};

const Filter1 = () => {
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
					justifyContent: "space-between",
					alignItems: "center",
					// color: "#f1f1ff",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						width: "100%",
						justifyContent: "center",
						height: globalStyles.headerHeight,
						color: "white",
						background: "#2052B5",
						// background: "pink",
					}}
				>
					<Box
						sx={{
							display: "flex",
							px: globalStyles.mx,
							justifyContent: "space-between",
							alignItems: "center",
							height: "100%",
							// background: "pink",
						}}
					>
						<Link
							component={NextLink}
							href="/chat"
							underline="hover"
							variant="body1"
							// color="black"
						>
							Chat
						</Link>
						<Typography>Hello, Superadmin</Typography>
						{/* <Icon /> */}
					</Box>
					{/* <Divider sx={{ width: "100%", background: "darkblue" }} /> */}
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						textAlign: "center",
						width: "70vw",
						height: "77.5vh",
						// background: "lightblue",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							// background: "pink",
							width: "40%",
						}}
					>
						<Typography
							textAlign="left"
							variant="h3"
							fontWeight={600}
							sx={{ mb: 0 }}
						>
							Find documents within minutes
						</Typography>
						<Typography textAlign="left" sx={{ mb: 1 }}>
							Search using document names and/or filters to
							quickly streamline documents for the references you
							need.
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							background: theme.palette.primary.dark,
							justifyContent: "space-between",
							// justifyContent: "space-around",
							height: "52.5vh",
							p: 2,
							borderRadius: 4,
						}}
					>
						<SearchField
							background="white"
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
						<Box
							sx={{
								display: "flex",
								// alignItems: "center",
								// background: "lightblue",
								my: 1,
								gap: 1,
								height: "fit-content",
							}}
						>
							<SearchField
								background="white"
								title="Search companies"
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
									background: "white",
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
									background: "white",
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
								background="#2052B5"
								color="white"
								text="Add documents"
								height="100%"
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
								// background: "pink",
								background: theme.palette.primary.main,
								height: "47.5%",
								mb: 1,
								borderRadius: 3,
								color: "black",
								overflow: "auto",
								"&::-webkit-scrollbar": {
									backgroundColor: theme.palette.primary.main,
									width: "14px",
								},
								"&::-webkit-scrollbar-track": {
									backgroundColor: theme.palette.primary.dark,
								},
								"&::-webkit-scrollbar-thumb": {
									background: theme.palette.primary.light,
									borderRadius: "16px",
									border: `4px solid ${theme.palette.primary.dark}`,
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
											variant="body1"
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
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								height: "7vh",
							}}
						>
							<RoundButton
								background="#2052B5"
								color="white"
								text="Start your conversation"
								height="100%"
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

export default Filter1;

"use client";

import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import RoundButton from "@components/RoundButton";
import MultiSelectDropdown from "@components/MultiSelectDropdown";
import DateDropdown from "@components/DateDropdown";
import { Box, Typography, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { globalStyles } from "styles";
import { useRouter } from "next/navigation";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PDF } from "interfaces";
import { get, post } from "utils/rest_utils";
import SearchField from "@components/SearchField";

const styles = {
	fontSize: "2vh",
	barWidth: 43, // vh
	barHeight: "10vh",
};

const Filter = () => {
	const token =
		typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;
	const router = useRouter();

	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [companyNames, setCompanyNames] = useState<string[]>([]);
	const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

	const [pdfs, setPdfs] = useState<PDF[]>([]);
	const [selectedPDFs, setSelectedPDFs] = useState<PDF[]>([]);

	useEffect(() => {
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
				router.push(`/chat/${session_id}`);
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
						mt: 5,
						// background: "pink",
						display: "flex",
						flexGrow: 1,
						justifyContent: "space-between",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							// background: "lightblue",
							width: "47.5%",
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
								// background: "pink",
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
											pdf.pdf_document_name === newValue
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
								// justifyContent: "space-between",
								gap: 2,
							}}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									width: "50%",
									gap: 1,
									// background: "pink",
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
										label: "Start Date",
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
										label: "End Date",
										date: endDate,
										onChange: (d) => setEndDate(d),
										width: "100%",
										height: styles.barHeight,
										mt: "-3px",
										fontSize: styles.fontSize,
									}}
								/>
								<Box sx={{ mt: 1 }}>
									<RoundButton
										text="Add"
										height="6vh"
										width="100%"
										fontSize={styles.fontSize}
										onClick={() => {
											addDocuments();
										}}
									/>
								</Box>
							</Box>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									width: "50%",
								}}
							>
								<Typography sx={{}}>
									Companies selected (
									{selectedCompanies.length})
								</Typography>
								<Box sx={{ border: 1, height: "100%" }}>
									{selectedCompanies.map((company) => (
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												// background: "pink",
												height: "fit-content",
												justifyContent: "space-between",
											}}
										>
											<Typography
												variant="body2"
												// sx={{ background: "lightblue" }}
											>
												{company}
											</Typography>
											<IconButton
												size="small"
												sx={
													{
														// background: "lightblue",
													}
												}
												disableRipple
												onClick={() =>
													setSelectedCompanies(
														selectedCompanies.filter(
															(item) =>
																item != company
														)
													)
												}
											>
												<Delete
												// sx={{ fontSize: "3vh" }}
												/>
											</IconButton>
										</Box>
									))}
								</Box>
							</Box>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							// background: "lightgreen",
							width: "47.5%",
							mb: 5,
						}}
					>
						<Typography
							variant="h4"
							lineHeight={1.1}
							sx={{
								backgroundColor: "",
							}}
						>
							Found documents
						</Typography>
						<Box sx={{ border: 1, height: "100%", mt: 1, mb: 1 }}>
							{selectedPDFs.map((pdf) => (
								<Box
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
										<Delete />
									</IconButton>
								</Box>
							))}
						</Box>
						<RoundButton
							text="Start Chat Session"
							height="6vh"
							width={styles.barWidth + "vh"}
							fontSize={styles.fontSize}
							onClick={() => {
								createSession();
							}}
						/>
					</Box>
				</Box>
				<Footer />
			</Box>
		</LocalizationProvider>
	);
};

export default Filter;

"use client";

import React from "react";
import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import { globalStyles } from "styles";
import { DataGrid } from "@mui/x-data-grid";

import Header from "@components/Header";
import RoundedDropdown from "@components/RoundedDropdown";
import SearchField from "@components/SearchField";
import RoundButton from "@components/RoundButton";
// import PDFViewerModal from "../../../src/modals/PDFViewerModal";

import { useRouter } from "next/navigation";

const columns = [
	{ field: "companyName", headerName: "Company Name", width: 150 },
	{ field: "documentTitle", headerName: "Document Title", width: 200 },
	{ field: "dateTime", headerName: "Date/Time", width: 200 },
	{
		field: "mostRelevantReference",
		headerName: "Most Relevant Reference",
		width: 520,
	},
	{
		field: "totalRelevancesFound",
		headerName: "Total Relevances Found",
		width: 175,
	},
];

const rows = [
	{
		id: 1,
		companyName: "ABC Holdings",
		documentTitle: "General Announcements",
		dateTime: "21 Nov 2023 01:15PM",
		mostRelevantReference:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		totalRelevancesFound: 30,
	},
	{
		id: 2,
		companyName: "BBC Holdings",
		documentTitle: "General Announcements",
		dateTime: "21 Nov 2023 01:15PM",
		mostRelevantReference:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		totalRelevancesFound: 10,
	},
	{
		id: 3,
		companyName: "BBC Holdings",
		documentTitle: "General Announcements",
		dateTime: "21 Nov 2023 01:15PM",
		mostRelevantReference:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		totalRelevancesFound: 6,
	},
	{
		id: 4,
		companyName: "BBC Holdings",
		documentTitle: "General Announcements",
		dateTime: "21 Nov 2023 01:15PM",
		mostRelevantReference:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		totalRelevancesFound: 6,
	},
	{
		id: 5,
		companyName: "BBC Holdings",
		documentTitle: "General Announcements",
		dateTime: "21 Nov 2023 01:15PM",
		mostRelevantReference:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		totalRelevancesFound: 6,
	},
	{
		id: 6,
		companyName: "BBC Holdings",
		documentTitle: "General Announcements",
		dateTime: "21 Nov 2023 01:15PM",
		mostRelevantReference:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		totalRelevancesFound: 6,
	},
	{
		id: 7,
		companyName: "BBC Holdings",
		documentTitle: "General Announcements",
		dateTime: "21 Nov 2023 01:15PM",
		mostRelevantReference:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		totalRelevancesFound: 6,
	},
	{
		id: 8,
		companyName: "BBC Holdings",
		documentTitle: "General Announcements",
		dateTime: "21 Nov 2023 01:15PM",
		mostRelevantReference:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		totalRelevancesFound: 6,
	},
	{
		id: 9,
		companyName: "BBC Holdings",
		documentTitle: "General Announcements",
		dateTime: "21 Nov 2023 01:15PM",
		mostRelevantReference:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		totalRelevancesFound: 6,
	},
];

export const ResultsPage = () => {
	const router = useRouter();

	const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(
		new Set([])
	);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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
					display: "flex",
					mx: globalStyles.mx,
					// backgroundColor: "pink",
					mt: "2vh",
					justifyContent: "space-between",
					gap: 2,
				}}
			>
				<RoundedDropdown
					headerText="Select Document Type"
					placeHolder="Document Type"
					options={["Company Announcements", "General Announcements"]}
					fontSize="1.75vh"
					width="25%"
					height="9.5vh"
				/>
				<SearchField
					props={{
						title: "Search for keywords and/or phrases",
						fontSize: "1.75vh",
						width: "57.5%",
						height: "9.5vh",
					}}
				/>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
					}}
				>
					<RoundButton
						text="Search"
						height="6.5vh"
						width="25vh"
						fontSize="1.75vh"
					/>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					mx: globalStyles.mx,
					backgroundColor: "",
					height: "70vh",
				}}
			>
				<Box sx={{ mt: 3, mb: 2 }}>
					<Typography lineHeight={1.1} sx={{ fontSize: "3vh" }}>
						Showing 30 documents
					</Typography>
				</Box>
				<DataGrid
					sx={{
						"&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell":
							{ py: "8px" },
						"&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell":
							{ py: "15px" },
						"&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell":
							{ py: "22px" },
					}}
					rows={rows}
					columns={columns}
					autoPageSize
					checkboxSelection
					disableRowSelectionOnClick
					hideFooterSelectedRowCount
					sortingMode="server"
					getRowHeight={() => "auto"}
					onCellClick={(params, event, details) => {
						if (selectedDocuments.has(params.id.toString())) {
							const newSet = new Set([...selectedDocuments]);
							newSet.delete(params.id.toString());
							setSelectedDocuments(newSet);
						} else {
							const newSet = new Set([...selectedDocuments]);
							newSet.add(params.id.toString());
							setSelectedDocuments(newSet);
						}
					}}
				/>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					background: "black",
					height: "8vh",
					px: globalStyles.mx,
				}}
			>
				<Typography sx={{ color: "white" }}>
					{selectedDocuments.size} document(s) selected
				</Typography>
				<Button
					type="submit"
					sx={{
						borderRadius: 6,
						backgroundColor: "#D9D9D9",
						color: "black",
						width: "25vh",
						textTransform: "none",
						"&:hover": {
							backgroundColor: "#ffffff",
							boxShadow: "none",
						},
					}}
					onClick={() => {
						router.push("/chat");
					}}
				>
					Next
				</Button>
				{/* <PDFViewerModal
					props={{ open: open, handleClose: handleClose }}
				/> */}
			</Box>
		</Box>
	);
};

export default ResultsPage;

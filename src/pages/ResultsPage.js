import React from "react";
import { useState } from "react";
import Header from "../components/Header";

import RoundedDropdown from "../components/RoundedDropdown";
import SearchField from "../components/SearchField";
import {
	Box,
	Container,
	Typography,
	Button,
	Divider,
	Modal,
} from "@mui/material";
import { globalStyles } from "../GlobalStyles";
import { DataGrid } from "@mui/x-data-grid";

import PDFViewerModal from "../modals/PDFViewerModal";

// import { Document, Page, pdfjs } from "react-pdf";
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// 	"pdfjs-dist/build/pdf.worker.min.js",
// 	import.meta.url
// ).toString();

const columns = [
	{ field: "companyName", headerName: "Company Name", width: 250 },
	{ field: "documentTitle", headerName: "Document Title", width: 250 },
	{ field: "dateTime", headerName: "Date/Time", width: 200 },
	{
		field: "mostRelevantReference",
		headerName: "Most Relevant Reference",
		width: 600,
	},
	{
		field: "totalRelevancesFound",
		headerName: "Total Relevances Found",
		width: 200,
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
					backgroundColor: "",
					mt: "2vh",
					justifyContent: "space-between",
				}}
			>
				<RoundedDropdown
					headerText="Select Document Type"
					placeHolder="Document Type"
					options={["Company Announcements", "General Announcements"]}
					onChange={(event) => {
						console.log(event);
					}}
					fontSize="12px"
					width="25%"
					height="7vh"
				/>
				<SearchField
					props={{
						title: "Search for keywords and/or phrases",
						fontSize: "12px",
						width: "57.5%",
						height: "7vh",
					}}
				/>
				<Box
					sx={{
						width: "15%",
						display: "flex",
						alignItems: "flex-end",
					}}
				>
					<Button
						type="submit"
						color="primary"
						sx={{
							borderRadius: 10,
							backgroundColor: "lightgrey",
							color: "black",
							height: "7vh",
							width: "100%",
							textTransform: "none",
							"&:hover": {
								backgroundColor: "#BBBBBB",
								boxShadow: "none",
							},
						}}
					>
						Search
					</Button>
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
					rows={rows}
					columns={columns}
					autoPageSize
					checkboxSelection
					disableSelectionOnClick
					sortingMode="server"
				/>
			</Box>
			{/* Footer */}
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
					0 document(s) selected
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
					onClick={handleOpen}
				>
					Next
				</Button>
				<PDFViewerModal
					props={{ open: open, handleClose: handleClose }}
				/>
			</Box>
		</Box>
	);
};

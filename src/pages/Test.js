import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
	Box,
	Button,
	Divider,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { globalStyles } from "../GlobalStyles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import DateDropdown from "../components/DateDropdown";
import SearchField from "../components/SearchField";
import { Document, Page, pdfjs } from "react-pdf";
import RoundedDropdown from "../components/RoundedDropdown";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.js",
	import.meta.url
).toString();

const Test = () => {
	const [numPages, setNumPages] = useState();
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess(numPages) {
		setNumPages(numPages);
	}

	return (
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
					display: "flex",
					flexDirection: "column",
					mx: globalStyles.mx,
					backgroundColor: "",
					height: `${
						100 -
						globalStyles.footerHeight -
						globalStyles.headerHeight
					}vh`,
					justifyContent: "",
					alignItems: "center",
				}}
			>
				<Typography
					lineHeight={1.1}
					sx={{ mt: "20px", fontSize: "3vh", mb: "100px" }}
				>
					RoundedDropdown
				</Typography>
				<Box sx={{ display: "flex", gap: 5, width: "100%" }}>
					<RoundedDropdown
						headerText="Select Document Type"
						placeHolder="Document Type"
						options={[
							"Company Announcements",
							"General Announcements",
						]}
						onChange={(event) => {
							console.log(event);
						}}
						fontSize="1.5vh"
						width="25%"
						height="6vh"
					/>
					<RoundedDropdown
						headerText="Select Document Type"
						placeHolder="Document Type"
						options={[
							"Company Announcements",
							"General Announcements",
						]}
						onChange={(event) => {
							console.log(event);
						}}
						fontSize="1.5vh"
						width="25%"
						height="17vh"
					/>
				</Box>
				{/* <Document
					file="antifragile.pdf"
					onLoadSuccess={onDocumentLoadSuccess}
				>
					<Page
						height={650}
						renderTextLayer={false}
						renderAnnotationLayer={false}
						pageNumber={pageNumber}
					/>
				</Document>
				<Button
					onClick={() => {
						const newPageNum = pageNumber + 1;
						setPageNumber(newPageNum);
					}}
				>
					Next
				</Button> */}
			</Box>
			<Footer />
		</Box>
	);
};

export default Test;

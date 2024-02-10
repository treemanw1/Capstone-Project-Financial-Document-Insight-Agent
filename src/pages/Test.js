import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDropdown from "../components/RoundedDropdown";
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
					sx={{ mt: "20px", fontSize: "3vh" }}
				>
					References Grid
				</Typography>
				<Grid></Grid>
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

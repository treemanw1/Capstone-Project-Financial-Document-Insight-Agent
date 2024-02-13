import { React, useState, useCallback } from "react";
import { Box, Typography, Button, Divider, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Document, Page, pdfjs } from "react-pdf";
import RoundButton from "../components/RoundButton";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.js",
	import.meta.url
).toString();

const columns = [
	{ field: "id", headerName: "No.", width: 40 },
	{
		field: "score",
		headerName: "Relevance Score",
		type: "number",
		width: 120,
		editable: true,
	},
	{
		field: "page",
		headerName: "Page",
		type: "number",
		width: 40,
		editable: true,
	},
	{
		field: "review",
		headerName: "Review",
		width: 80,
		editable: true,
	},
];

const rows = [
	{ id: 1, score: 0.9, page: 13, review: "" },
	{ id: 2, score: 0.9, page: 1, review: "" },
	{ id: 3, score: 0.9, page: 50, review: "" },
	{ id: 4, score: 0.39, page: 100, review: "" },
	{ id: 5, score: 0.5, page: 16, review: "" },
	{ id: 6, score: 0.9, page: 13, review: "" },
	{ id: 7, score: 0.9, page: 13, review: "" },
	{ id: 8, score: 0.6, page: 13, review: "" },
	{ id: 9, score: 0.9, page: 13, review: "" },
	{ id: 10, score: 0.9, page: 13, review: "" },
];

function highlightPattern(text, patterns) {
	for (var i = 0; i < patterns.length; i++) {
		text = text.replace(patterns[i], (value) => `<mark>${value}</mark>`);
	}
	return text;
}

const PDFViewerModal = ({ props }) => {
	const [numPages, setNumPages] = useState();
	const [pageNumber, setPageNumber] = useState(1);
	const [chunks, setChunks] = useState([
		{
			id: 1,
			text: "Wind extinguishes a candle and energizes fire.",
			pageNum: 16,
		},
		{
			id: 2,
			text: "How?",
			pageNum: 16,
		},
		{
			id: 3,
			text: "The green lumber fallacy.",
			pageNum: 13,
		},
	]);

	const textRenderer = useCallback(
		(textItem) => {
			const patterns = chunks
				.filter((o) => o.pageNum == pageNumber)
				.map((o) => o.text);
			return highlightPattern(textItem.str, patterns);
		},
		[pageNumber]
	);

	function onDocumentLoadSuccess(numPages) {
		setNumPages(numPages);
	}

	return (
		<Modal
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					height: "90vh",
					width: "95%",
					bgcolor: "white",
					boxShadow: 24,
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						p: 1,
						background: "",
					}}
				>
					<Box sx={{ width: "80px" }} />
					<Typography fontSize="2.5vh">Review References</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							width: "80px",
							background: "",
						}}
					>
						<Button
							onClick={props.handleClose}
							sx={{ color: "black" }}
						>
							X
						</Button>
					</Box>
				</Box>
				<Divider sx={{ width: "100%", background: "black" }} />
				<Box
					sx={{
						display: "flex",
						background: "",
						justifyContent: "space-between",
						height: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "24%",
							background: "",
						}}
					>
						<Box
							sx={{
								p: 2,
								background: "",
							}}
						>
							<Typography fontSize="20px">
								ABC Holdings
							</Typography>
							<Typography sx={{ mt: "10px", mb: "5px" }}>
								30 references found
							</Typography>
							<DataGrid
								sx={{
									fontSize: "14px",
									height: "68vh",
								}}
								checkboxSelection={false}
								rows={rows}
								columns={columns}
								autoPageSize
								disableSelectionOnClick
								sortingMode="server"
								onRowClick={(params) => {
									setPageNumber(params.row.page);
								}}
							/>
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							background: "#F5F5F5",
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							height: "100%",
						}}
					>
						<Document
							file="antifragile.pdf"
							onLoadSuccess={onDocumentLoadSuccess}
						>
							<Page
								height={550} // useState for responsiveness later
								// renderTextLayer={false}
								renderAnnotationLayer={false}
								pageNumber={pageNumber}
								customTextRenderer={textRenderer}
							/>
						</Document>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "18%",
							p: 3,
							justifyContent: "space-between",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1.5,
							}}
						>
							<Typography sx={{ fontSize: "14px" }}>
								Edit reference
							</Typography>
							<Typography sx={{ fontSize: "14px" }}>
								Add reference
							</Typography>
							<Typography sx={{ fontSize: "14px" }}>
								30%
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1.5,
							}}
						>
							<RoundButton
								props={{ text: "Cancel" }}
								handleClick={props.handleClose}
							/>
							<RoundButton
								props={{ text: "Confirm Review" }}
								handleClick={props.handleClose}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default PDFViewerModal;

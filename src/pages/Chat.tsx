import React, { useEffect, useRef, useState, useCallback } from "react";
import {
	Box,
	Button,
	Container,
	Divider,
	TextField,
	Typography,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.js",
	import.meta.url
).toString();

function highlightPattern(text, patterns) {
	for (var i = 0; i < patterns.length; i++) {
		text = text.replace(patterns[i], (value) => `<mark>${value}</mark>`);
	}
	return text;
}

const messages = [
	{
		id: 0,
		content: "Hi, I am the user",
	},
	{
		id: 1,
		content:
			"Hello there! This is the chatbot response. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: 2,
		content: "I have another question. What is the meaning of life?",
	},
];

const Chat = () => {
	const [pdfs, setPDFs] = useState([
		{
			id: 0,
			name: "Antifragile - Nassim Taleb",
			numPages: 581,
			path: "antifragile.pdf",
			currentPage: 1,
		},
		{
			id: 1,
			name: "Shogun - James Clavell",
			numPages: 1081,
			path: "shogun.pdf",
			currentPage: 1,
		},
	]);
	const [selectedPDF, setSelectedPDF] = useState(0);

	const [pageNumber, setPageNumber] = useState(1);

	const [chunks, setChunks] = useState([
		{
			id: 1,
			text: "Wind extinguishes a candle and energizes fire.",
			pageNum: 16,
		},
	]);

	const [numPages, setNumPages] = useState();

	const textRenderer = useCallback(
		(textItem) => {
			const patterns = chunks
				.filter((o) => o.pageNum == pageNumber)
				.map((o) => o.text);
			return highlightPattern(textItem.str, patterns);
		},
		[pageNumber]
	);

	const onDocumentLoadSuccess = (numPages) => {
		setNumPages(numPages);
	};

	const setCurrentPage = (id, pageNum) => {
		setPDFs((prevPdfs) => {
			const newPdfs = [...prevPdfs];
			newPdfs[id].currentPage = pageNum;
			return newPdfs;
		});
	};

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				backgroundColor: "",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "40%",
					// backgroundColor: "pink",
					justifyContent: "space-between",
				}}
			>
				<Box>
					<Typography sx={{ m: 2 }}>
						Back to Document Selection
					</Typography>
					<Divider />
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "end",
						flex: 1,
						// background: "pink",
						overflow: "auto",
						p: 2,
						gap: 2,
					}}
				>
					{messages.map((message) => {
						if (message.id % 2 == 0) {
							return (
								<Typography
									sx={{
										display: "flex",
										justifyContent: "end",
									}}
								>
									{message.content}
								</Typography>
							);
						} else {
							return (
								<Typography sx={{}}>
									{message.content}
								</Typography>
							);
						}
					})}
				</Box>
				<TextField
					placeholder="Start typing your question..."
					sx={{
						"& .MuiOutlinedInput-root": {
							borderRadius: 0,
						},
					}}
				/>
			</Box>
			<Divider sx={{ background: "#E0E0E0", width: "1px" }} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					backgroundColor: "",
					width: "52.5%",
					justifyContent: "space-between",
				}}
			>
				<Box sx={{ background: "" }}>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Typography sx={{ m: 2 }}>
							{pdfs.find((o) => o.id === selectedPDF)?.name}
						</Typography>
						<TextField
							defaultValue={1}
							onChange={(event) => {
								const newPage = parseInt(event.target.value);
								const currPDF = pdfs.find(
									(o) => o.id === selectedPDF
								);
								if (
									newPage >= 1 &&
									newPage <= (currPDF?.numPages ?? 0)
								) {
									setCurrentPage(currPDF?.id, newPage);
								}
							}}
						>
							Textfield
						</TextField>
						<Typography sx={{ m: 2 }}>
							/{pdfs.find((o) => o.id === selectedPDF)?.numPages}
						</Typography>
					</Box>
					<Divider />
				</Box>
				<Box
					sx={{
						display: "flex",
						// background: "lightblue",
						justifyContent: "center",
						height: "100%",
						overflow: "auto",
					}}
				>
					<Document
						file={pdfs.find((o) => o.id === selectedPDF)?.path}
						onLoadSuccess={onDocumentLoadSuccess}
					>
						<Page
							width={789}
							// height={500} // useState for responsiveness later
							// renderTextLayer={false}
							renderAnnotationLayer={false}
							pageNumber={
								pdfs.find((o) => o.id === selectedPDF)
									?.currentPage
							}
							customTextRenderer={textRenderer}
						/>
					</Document>
				</Box>
			</Box>
			<Divider sx={{ background: "#E0E0E0", width: "1px" }} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					// backgroundColor: "pink",
					width: "7.5%",
				}}
			>
				{pdfs.map((pdf) => {
					return (
						<Button
							onClick={() => {
								setSelectedPDF(pdf.id);
							}}
							sx={{
								color: "black",
								textTransform: "none",
								borderBottom: 1,
								borderRadius: 0,
							}}
						>
							{pdf.name}
						</Button>
					);
				})}
			</Box>
		</Box>
	);
};

export default Chat;

"use client";

import React, { useState, useCallback } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import style from "./chat.module.css";

import { useRouter } from "next/navigation";

// pdfjs.GlobalWorkerOptions.workerSrc =
// 	"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
// 	"pdfjs-dist/build/pdf.worker.min.js",
// 	import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function highlightPattern(text: string, patterns: string[]) {
	for (var i = 0; i < patterns.length; i++) {
		text = text.replace(patterns[i], (value) => `<mark>${value}</mark>`);
	}
	return text;
}

const styles = {
	headerHeight: "8vh",
};

const Chat = () => {
	const [pdfs, setPDFs] = useState<
		Array<{
			id: number;
			name: string;
			numPages: number;
			path: string;
			currentPage: number;
		}>
	>([
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

	const router = useRouter();

	const [selectedPDFID, setSelectedPDFID] = useState<number>(0);

	const [displayPageNum, setDisplayPageNum] = useState<string>(() => {
		const foundPdf = pdfs.find((o) => o.id === selectedPDFID);
		return foundPdf?.currentPage?.toString() ?? "";
	});

	const [pageNumber, setPageNumber] = useState<number>(1); // for chunk highlighting

	const [chunks, setChunks] = useState<
		Array<{
			id: number;
			text: string;
			pageNum: number;
		}>
	>([
		{
			id: 1,
			text: "Wind extinguishes a candle and energizes fire.",
			pageNum: 16,
		},
	]);

	const [query, setQuery] = useState<string>("");
	const [messages, setMessages] = useState<
		Array<{
			id: string;
			content: string;
		}>
	>([]);

	// chunk highlighting
	// const textRenderer = useCallback(
	// 	(textItem) => {
	// 		const patterns = chunks
	// 			.filter((o) => o.pageNum == pageNumber)
	// 			.map((o) => o.text);
	// 		return highlightPattern(textItem.str, patterns);
	// 	},
	// 	[pageNumber]
	// );

	const setCurrentPage = (id: number, pageNum: number) => {
		console.log(id, pageNum);
		setPDFs((prevPdfs) => {
			const newPdfs = [...prevPdfs];
			newPdfs[id].currentPage = pageNum;
			return newPdfs;
		});
	};

	const onSendQuery = () => {
		const id: number =
			messages.length == 0
				? 0
				: parseInt(messages[messages.length - 1].id) + 1;
		let message = {
			id: id.toString(),
			content: query,
		};
		setMessages(messages.concat(message));
		setQuery("");
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
					borderRight: 1,
				}}
			>
				<Box sx={{ height: styles.headerHeight, borderBottom: 1 }}>
					<Button
						disableFocusRipple
						disableTouchRipple
						sx={{
							color: "black",
							textTransform: "none",
							borderRadius: 0,
							height: "8vh",
							ml: 2,
							"&:hover": {
								backgroundColor: "transparent",
								textDecoration: "underline",
							},
							"&:active": {
								backgroundColor: "transparent",
								color: "",
							},
						}}
						onClick={() => {
							router.push("/results-page");
						}}
					>
						Back to Document Selection
					</Button>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "end",
						flex: 1,
						// background: "pink",
						overflow: "scroll",
						p: 2,
						gap: 2,
					}}
				>
					<Box sx={{ minHeight: 0 }}>
						{messages.map((message) => {
							if (parseInt(message.id) % 2 == 0) {
								return (
									<Typography
										key={message.id}
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
									<Typography
										key={message.id}
										sx={{ display: "flex" }}
									>
										{message.content}
									</Typography>
								);
							}
						})}
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						// background: "pink",
						borderTop: 1,
					}}
				>
					<TextField
						value={query}
						onChange={(event) => {
							setQuery(event.target.value);
						}}
						onKeyDown={(event) => {
							if (event.key == "Enter") {
								onSendQuery();
							}
						}}
						placeholder="Start typing your question..."
						sx={{
							flex: 1,
							"& fieldset": { border: "none" },
							"& .MuiOutlinedInput-root": {
								"& fieldset": {
									borderColor: "#E0E3E7",
								},
								"&:hover fieldset": {
									borderColor: "#E0E3E7",
								},
								borderRadius: 0,
							},
						}}
					/>
					<Button
						sx={{
							background: "lightgray",
							color: "black",
							textTransform: "none",
							borderRadius: 0,
							"&:hover": {
								backgroundColor: "#3C3C3C",
								color: "white",
							},
						}}
						onClick={onSendQuery}
					>
						Send
					</Button>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					// backgroundColor: "lightblue",
					width: "52.5%",
					justifyContent: "space-between",
					borderRight: 1,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						height: styles.headerHeight,
						borderBottom: 1,
					}}
				>
					<Typography sx={{ m: 2 }}>
						{pdfs.find((o) => o.id === selectedPDFID)?.name}
					</Typography>
					<TextField
						sx={{
							display: "flex",
							justifyContent: "center",
							width: "60px",
							height: "40px",
							border: 1,
							"& fieldset": { border: "none" },
						}}
						value={displayPageNum}
						onChange={(event) => {
							const pageNumber: string = event.target.value;
							const maxPages: number =
								pdfs.find((o) => o.id === selectedPDFID)
									?.numPages ?? 1;
							if (
								/^(?:[1-9]\d*)?$/.test(pageNumber) &&
								(parseInt(pageNumber) < maxPages ||
									pageNumber == "")
							) {
								const currPDFID: number =
									pdfs.find((o) => o.id === selectedPDFID)
										?.id ?? 0;
								setDisplayPageNum(pageNumber);
								setCurrentPage(currPDFID, parseInt(pageNumber));
							}
						}}
					/>
					<Typography sx={{ m: 2 }}>
						/{pdfs.find((o) => o.id === selectedPDFID)?.numPages}
					</Typography>
				</Box>
				<Box
					sx={{
						background: "#F1F1F1",
						// background: "pink",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						height: `calc(100vh - ${styles.headerHeight})`,
						overflow: "auto",
					}}
				>
					<Document
						className={style.document}
						file={pdfs.find((o) => o.id === selectedPDFID)?.path}
						// onLoadSuccess={onDocumentLoadSuccess}
					>
						{Array.from(
							new Array(
								pdfs.find(
									(o) => o.id === selectedPDFID
								)?.numPages
							),
							(el, index) => (
								<Page
									key={`page_${index + 1}`}
									pageNumber={index + 1}
								/>
							)
						)}
						{/* <Page
							width={700}
							className={style.page}
							renderAnnotationLayer={false}
							pageNumber={
								pdfs.find((o) => o.id === selectedPDFID)
									?.currentPage
							}
							// customTextRenderer={textRenderer}
						/> */}
					</Document>
				</Box>
			</Box>
			<Divider sx={{ background: "#E0E0E0", width: "1px" }} />
			<Box
				sx={{
					display: "flex",
					// background: "pink",
					flexDirection: "column",
					width: "7.5%",
				}}
			>
				<Box sx={{ height: styles.headerHeight, borderBottom: 1 }} />
				{pdfs.map((pdf) => {
					return (
						<Button
							key={pdf.id}
							onClick={() => {
								setSelectedPDFID(pdf.id);
							}}
							sx={{
								color: "black",
								textTransform: "none",
								fontSize: "13px",
								textAlign: "left",
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

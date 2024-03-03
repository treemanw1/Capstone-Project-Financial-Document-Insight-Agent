"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";

import { useRouter } from "next/navigation";

import PDFViewer from "./PDFViewer";

import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { globalStyles } from "styles";
import { PDF, Message } from "interfaces";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Chat = () => {
	const router = useRouter();
	router.prefetch("/results-page");

	const [pdfs, setPDFs] = useState<PDF[] | null>(null);
	const [selectedPDFID, setSelectedPDFID] = useState<number | null>(null);

	const [query, setQuery] = useState<string>("");
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			// try {
			// 	const response = await fetch("INSERT API ENDPOINT HERE");
			// 	if (!response.ok) {
			// 		throw new Error("Failed to fetch PDFs");
			// 	}
			// 	const data = await response.json();
			// 	setPDFs(data);
			// } catch (error) {
			// 	console.error("Error fetching PDFs:", error);
			// }
			setPDFs([
				{
					id: 0,
					name: "Antifragile - Nassim Taleb",
					numPages: 581,
					path: "antifragile.pdf",
				},
				{
					id: 1,
					name: "Shogun - James Clavell",
					numPages: 1081,
					path: "shogun.pdf",
				},
			]);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (pdfs && pdfs.length > 0) {
			setSelectedPDFID(pdfs[0].id);
		}
	}, [pdfs]);

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
				<Box
					sx={{ height: globalStyles.headerHeight, borderBottom: 1 }}
				>
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
			<PDFViewer
				pdf={pdfs?.find((pdf) => pdf.id == selectedPDFID) || null}
			/>
			<Divider sx={{ background: "#E0E0E0", width: "1px" }} />
			<Box
				sx={{
					display: "flex",
					// background: "pink",
					flexDirection: "column",
					width: "7.5%",
				}}
			>
				<Box
					sx={{ height: globalStyles.headerHeight, borderBottom: 1 }}
				/>
				{pdfs == null ? (
					<Typography>Loading...</Typography>
				) : (
					pdfs.map((pdf) => {
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
					})
				)}
			</Box>
		</Box>
	);
};

export default Chat;

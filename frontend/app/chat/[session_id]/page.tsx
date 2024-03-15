"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";

import { useRouter } from "next/navigation";

import PDFViewer from "../PDFViewer";

import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { globalStyles } from "styles";
import { PDF, ChatMessage, Chunk, Session } from "interfaces";
import Message from "@components/Message";
import { FixedSizeList } from "react-window";

import { get, post } from "utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Chat = ({ params }: { params: { session_id: string } }) => {
	const token = localStorage.getItem("jwtToken");

	const router = useRouter();

	const [pdfs, setPDFs] = useState<PDF[] | null>(null);
	const [selectedPDFID, setSelectedPDFID] = useState<number | null>(null);
	const [sessions, setSessions] = useState<Session[]>([]);

	const [currentSessionId, setCurrentSessionId] = useState<number | null>(
		null
	);

	const [currentQuery, setCurrentQuery] = useState<string>("");
	const [messages, setMessages] = useState<ChatMessage[]>([]);

	const [chunks, setChunks] = useState<Chunk[]>([]);

	const [currentPage, setCurrentPage] = useState<string>("1");
	const listRef = useRef<FixedSizeList>(null);

	useEffect(() => {
		router.prefetch("/filter");
		get(
			token,
			"/get-sessions",
			"Failed to fetch sessions.",
			(session_ids: any) => {
				console.log("session ids:", session_ids);
				setSessions(session_ids);
			}
		);
		setPDFs([
			{
				id: 0,
				pdf_document_name: "Antifragile - Nassim Taleb",
				company_name: "Random House",
				num_pages: 581,
				filepath: "../antifragile.pdf",
			},
			{
				id: 1,
				pdf_document_name: "Shogun - James Clavell",
				company_name: "Dell",
				num_pages: 1081,
				filepath: "../shogun.pdf",
			},
		]);
	}, []);

	useEffect(() => {
		if (pdfs && pdfs.length > 0) {
			setSelectedPDFID(pdfs[0].id);
		}
	}, [pdfs]);

	const sendQuery = async () => {
		post(
			token,
			currentQuery,
			"/query",
			"Failed to fetch LLM response and chunks.",
			(queryResponse: any) => {
				setMessages(
					messages.concat({
						id: queryResponse.id,
						session_id: currentSessionId!, // replace later
						role: "user",
						message: currentQuery,
					})
				);
				setChunks(chunks.concat(queryResponse.chunk));
			}
		);
		setCurrentQuery("");
	};

	const getSessionHistory = async (session_id: number) => {
		try {
			const response = await fetch(
				`http://localhost:8000/get-chat-history/${session_id}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to fetch session history.");
			} else {
				const chat_history = await response.json();
				setMessages(chat_history);
			}
		} catch (error) {
			console.error("Error fetching PDFs:", error);
		}
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
					width: "18%",
					// backgroundColor: "pink",
					// justifyContent: "space-between",
					borderRight: 1,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						// justifyContent: "center",
						height: globalStyles.headerHeight,
						borderBottom: 1,
					}}
				>
					<Typography sx={{ ml: 2 }}>Sessions</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						flex: 1,
						// background: "pink",
						p: 1,
						gap: 0.5,
					}}
				>
					{sessions.map((session) => {
						return (
							<Button
								key={session.id}
								sx={{
									textTransform: "none",
									color: "black",
									background: "#DDDDDD",
									"&:hover": {
										backgroundColor: "#EEEEEE",
									},
									textAlign: "left",
									px: 1.5,
								}}
								onClick={() => {
									setCurrentSessionId(session.id);
									getSessionHistory(session.id);
								}}
							>
								{session.name}
							</Button>
						);
					})}
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "50%",
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
							router.push("/filter");
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
							return (
								<Message
									key={message.id}
									message={message}
									chunk={chunks.find(
										(chunk) => chunk.id == message.id
									)}
									setCurrentPage={setCurrentPage}
									listRef={listRef}
								/>
							);
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
						value={currentQuery}
						onChange={(event) => {
							setCurrentQuery(event.target.value);
						}}
						onKeyDown={(event) => {
							if (event.key == "Enter" && currentQuery != "") {
								sendQuery();
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
						onClick={() => {
							if (currentQuery != "") {
								sendQuery();
							}
						}}
					>
						Send
					</Button>
				</Box>
			</Box>
			<PDFViewer
				pdf={pdfs?.find((pdf) => pdf.id == selectedPDFID) || null}
				chunks={chunks}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				listRef={listRef}
			/>
			<Divider sx={{ background: "#E0E0E0", width: "1px" }} />
			<Box
				sx={{
					display: "flex",
					// background: "pink",
					flexDirection: "column",
					width: "5%",
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
								{pdf.pdf_document_name}
							</Button>
						);
					})
				)}
			</Box>
		</Box>
	);
};

export default Chat;

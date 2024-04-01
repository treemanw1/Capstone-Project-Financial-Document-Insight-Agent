"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import PDFViewer from "./(components)/PDFViewer";
import PDFList from "./(components)/PDFList";

import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";

import { globalStyles } from "styles";
import { PDF, ChatMessage, Chunk, Session } from "interfaces";
import Sessions from "app/chat/(components)/Sessions";
import ChatSection from "app/chat/(components)/ChatSection";
import { FixedSizeList } from "react-window";

import { get } from "utils/rest_utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const dummySessions = [
	{
		id: 0,
		created_at: new Date(),
		name: "Sessions on sessions",
	},
	{
		id: 1,
		created_at: new Date(),
		name: "Trump vs Biden Cage Match",
	},
	{
		id: 2,
		created_at: new Date("2024-03-14T10:00:00"),
		name: "Sessions 2",
	},
	{
		id: 3,
		created_at: new Date("2023-03-15T10:00:00"),
		name: "What's even the point of life?",
	},
];

const dummyMessages = [
	{
		id: 0,
		session_id: 3,
		message: "Hello, world!",
		role: "user",
	},
	{
		id: 1,
		session_id: 3,
		message: "Hello, user!",
		role: "bot",
		chunks: [
			{
				id: 0,
				text: "Wind extinguishes a candle",
				pageNum: 16,
				pdfName: "Antifragile - Nassim Taleb",
				pdfID: 0,
			},
		],
	},
	{
		id: 2,
		session_id: 3,
		message: "What is a copypasta?",
		role: "user",
	},
	{
		id: 3,
		session_id: 3,
		message:
			"A copypasta is a block of text copied and pasted to the Internet and social media. Copypasta containing controversial ideas or lengthy rants are often posted for humorous purposes, to provoke reactions from those unaware that the posted text is a meme.",
		role: "bot",
		chunks: [
			{
				id: 1,
				text: "I want to live happily in a world I don’t understand.",
				pageNum: 20,
				pdfName: "Antifragile - Nassim Taleb",
				pdfID: 0,
			},
		],
	},
	{
		id: 4,
		session_id: 3,
		message: "What is a copypasta?",
		role: "user",
	},
	{
		id: 4,
		session_id: 3,
		message:
			'"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system."',
		role: "bot",
		chunks: [
			{
				id: 2,
				text: "THE INVERSE TURKEY PROBLEM",
				pageNum: 250,
				pdfName: "Antifragile - Nassim Taleb",
				pdfID: 0,
			},
		],
	},
	{
		id: 4,
		session_id: 3,
		message: "What were Blackrock's earnings last quarter?",
		role: "user",
	},
	{
		id: 4,
		session_id: 3,
		message: "What is the iShares fund?",
		role: "bot",
		chunks: [
			{
				id: 2,
				text: `iShares MSCI India Index ETF (“MSCI India ETF”), a sub-fund of
                the iShares Southeast Asia Trust (the “Trust”), was launched
                and commenced trading on 15 June 2006 on the Singapore
                Exchange Securities `,
				pageNum: 3,
				pdfName:
					"SG220831OTHRXDF6_Blackrock (Singapore) Limited_20220831171053_00_GA_4Q_20220831.1.pdf",
				pdfID: 0,
			},
			{
				id: 2,
				text: "THE INVERSE TURKEY PROBLEM",
				pageNum: 250,
				pdfName: "Antifragile - Nassim Taleb",
				pdfID: 0,
			},
		],
	},
];

const Chat = ({ params }: { params: { session_id: string } }) => {
	const theme = useTheme();

	const token =
		typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

	const router = useRouter();

	const [pdfs, setPDFs] = useState<PDF[] | null>(null);
	const [selectedPDFID, setSelectedPDFID] = useState<number | null>(null);
	const [sessions, setSessions] = useState<Session[]>([]);
	const [currentSessionId, setCurrentSessionId] = useState<number | null>(
		null
	);
	const [currentQuery, setCurrentQuery] = useState<string>("");
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [highlightedChunks, setHighlightedChunks] = useState<Chunk[]>([]);
	const [currentPage, setCurrentPage] = useState<string>("1");
	const listRef = useRef<FixedSizeList>(null);

	const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

	useEffect(() => {
		router.prefetch("/filter");
		get(token, "/get-sessions", "Failed to fetch sessions.", (sessions) => {
			sessions.sort(
				(a: Session, b: Session) =>
					new Date(b.created_at).getTime() -
					new Date(a.created_at).getTime()
			);
			setSessions(sessions);
			setCurrentSessionId(sessions[0].id);
			get(
				token,
				`/get-pdfs/${sessions[0].id}`,
				"Failed to fetch PDFs.",
				(pdfs) => {
					setPDFs(pdfs);
				}
			);
		});

		// setSessions(dummySessions);
		// setPDFs([
		// 	{
		// 		id: 0,
		// 		pdf_document_name: "Antifragile - Nassim Taleb",
		// 		company: "Random House",
		// 		num_pages: 581,
		// 		filepath: "pdfs/antifragile.pdf",
		// 	},
		// 	{
		// 		id: 1,
		// 		pdf_document_name: "Shogun - James Clavell",
		// 		company: "Dell",
		// 		num_pages: 1081,
		// 		filepath: "pdfs/shogun.pdf",
		// 	},
		// ]);
	}, []);

	useEffect(() => {
		if (pdfs && pdfs.length > 0) {
			setSelectedPDFID(pdfs[0].id);
		}
	}, [pdfs]);

	const getSessionHistory = async (session_id: number) => {
		get(
			token,
			`/get-chat-history/${session_id}`,
			"Failed to fetch session history.",
			(chat_history) => {
				console.log("chat_history: ", chat_history);
				setMessages(chat_history);
			}
		);
	};

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				background: theme.palette.primary.light,
				color: theme.palette.text.primary,
			}}
		>
			<Drawer
				sx={{
					width: globalStyles.drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: globalStyles.drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={sidebarOpen}
			>
				<Sessions
					currentSessionId={currentSessionId}
					sessions={sessions}
					// sessions={dummySessions}
					onClickSession={(id) => {
						setCurrentSessionId(id);
						getSessionHistory(id);
						get(
							token,
							`/get-pdfs/${id}`,
							"Failed to fetch PDFs.",
							(pdfs) => {
								setPDFs(pdfs);
							}
						);
					}}
				/>
			</Drawer>
			<Box
				sx={{
					width: `calc(100vw - ${globalStyles.drawerWidth}px)`,
					display: "flex",
					flexGrow: 1,
					// background: "lightblue",
					justifyContent: "flex-end",
					transition:
						"margin 100ms ease-in-out, width 10ms ease-in-out",
					marginLeft: `-${globalStyles.drawerWidth}px`,
					...(sidebarOpen && {
						transition:
							"margin 210ms ease-out, width 210ms ease-out",
						marginLeft: 0,
						// width: `calc(100vw - ${globalStyles.drawerWidth}px)`,
					}),
				}}
			>
				<ChatSection
					token={token}
					currentQuery={currentQuery}
					setCurrentQuery={setCurrentQuery}
					messages={messages}
					// messages={dummyMessages}
					setMessages={setMessages}
					currentSessionId={currentSessionId}
					setHighlightedChunks={setHighlightedChunks}
					setCurrentPage={setCurrentPage}
					listRef={listRef}
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
					setSelectedPDFID={setSelectedPDFID}
					sessions={sessions}
					setSessions={setSessions}
				/>
				<PDFViewer
					pdfs={pdfs}
					setSelectedPDFID={setSelectedPDFID}
					pdf={pdfs?.find((pdf) => pdf.id == selectedPDFID) || null}
					highlightedChunks={highlightedChunks}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					listRef={listRef}
				/>
				{/* <PDFList pdfs={pdfs} setSelectedPDFID={setSelectedPDFID} /> */}
			</Box>
		</Box>
	);
};

export default Chat;

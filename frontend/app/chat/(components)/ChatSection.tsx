import React, {
	useEffect,
	useRef,
	useContext,
	Dispatch,
	SetStateAction,
} from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { globalStyles } from "styles";

import { post } from "utils/rest_utils";
import { isBotMessage } from "utils/type_utils";

import { ChatMessage, Chunk } from "interfaces";
import Message from "app/chat/(components)/Message";
import QueryField from "app/chat/(components)/QueryField";

import { FixedSizeList } from "react-window";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { ColorModeContext } from "@components/ThemeWrapper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface MyComponentProps {
	token: string | null;
	currentQuery: string;
	setCurrentQuery: (query: string) => void;
	messages: ChatMessage[] | any[];
	setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
	currentSessionId: number | null;
	setHighlightedChunks: Dispatch<SetStateAction<Chunk[]>>;
	setCurrentPage: (page: string) => void;
	listRef: React.RefObject<FixedSizeList>;
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
	setSelectedPDFID: Dispatch<SetStateAction<number | null>>;
}

const ChatSection: React.FC<MyComponentProps> = ({
	token,
	currentQuery,
	setCurrentQuery,
	messages,
	setMessages,
	currentSessionId,
	setHighlightedChunks,
	setCurrentPage,
	listRef,
	sidebarOpen,
	setSidebarOpen,
	setSelectedPDFID,
}) => {
	const theme = useTheme();
	const { toggleColorMode } = useContext(ColorModeContext);

	const hasPageBeenRendered = useRef<boolean>(false);

	useEffect(() => {
		// if messages changes it means that the user has sent a query
		if (
			hasPageBeenRendered.current &&
			messages.length > 0 &&
			messages.slice(-1)[0].role == "user"
		) {
			post(
				token,
				{ query: currentQuery, session_id: currentSessionId },
				"/query",
				"Failed to fetch LLM response and chunks.",
				(botMessage: any) => {
					const message = {
						message: botMessage.message,
						session_id: currentSessionId!,
						role: "bot",
						chunks: botMessage.chunks,
					};
					setMessages([...messages, message]);
					setHighlightedChunks(botMessage.chunks);
				}
			);
			setCurrentQuery("");
		}
		hasPageBeenRendered.current = true;
	}, [messages]);

	const sendQuery = async (userMessage: string) => {
		setMessages([
			...messages,
			{
				message: currentQuery,
				session_id: currentSessionId,
				role: "user",
			},
		]);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "37.5%",
				background: theme.palette.primary.main,
				// background: "lightblue",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					height: globalStyles.headerHeight,
					width: "100%",
					borderColor: theme.palette.secondary.light,
				}}
			>
				<IconButton
					disableRipple
					sx={{ ml: 1 }}
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					{sidebarOpen ? (
						<ArrowBackIos
							sx={{
								fontSize: "17.5px",
								color: theme.palette.text.primary,
								"&:hover": { color: "#454F59" },
							}}
						/>
					) : (
						<ArrowForwardIos
							sx={{
								fontSize: "17.5px",
								color: theme.palette.text.primary,
								"&:hover": { color: "#454F59" },
							}}
						/>
					)}
				</IconButton>
				<Typography sx={{ ml: 2 }} fontWeight="bold" variant="h6">
					DuRAG Chat
				</Typography>
				<IconButton
					sx={{ ml: 1 }}
					onClick={toggleColorMode}
					color="inherit"
				>
					{theme.palette.mode === "dark" ? (
						<Brightness7Icon />
					) : (
						<Brightness4Icon />
					)}
				</IconButton>
			</Box>
			<Box
				sx={{
					scrollBehavior: "smooth",
					display: "flex",
					flexDirection: "column-reverse",
					justifyContent: "end",
					flex: 1,
					overflow: "auto",
					gap: 2,
					width: "90%",
					// background: "pink",
					"&::-webkit-scrollbar": {
						backgroundColor: theme.palette.primary.main,
						width: "14px",
					},
					"&::-webkit-scrollbar-track": {
						backgroundColor: theme.palette.primary.main,
					},
					"&::-webkit-scrollbar-thumb": {
						background: theme.palette.primary.dark,
						borderRadius: "16px",
						border: `4px solid ${theme.palette.primary.main}`,
					},
					"&::-webkit-scrollbar-button": {
						display: "none",
					},
				}}
			>
				<Box sx={{}}>
					{messages.map((message, index) => {
						return (
							<Message
								key={index}
								message={message}
								chunks={
									isBotMessage(message)
										? message.chunks
										: null
								}
								setCurrentPage={setCurrentPage}
								listRef={listRef}
								setHighlightedChunks={setHighlightedChunks}
								setSelectedPDFID={setSelectedPDFID}
							/>
						);
					})}
				</Box>
			</Box>
			<QueryField
				currentQuery={currentQuery}
				setCurrentQuery={setCurrentQuery}
				sendQuery={sendQuery}
				messages={messages}
				setMessages={setMessages}
				sessionId={currentSessionId!}
			/>
		</Box>
	);
};

export default ChatSection;

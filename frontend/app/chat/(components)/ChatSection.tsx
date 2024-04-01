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

import { ChatMessage, Chunk, Session } from "interfaces";
import Message from "app/chat/(components)/Message";
import QueryField from "app/chat/(components)/QueryField";

import { FixedSizeList } from "react-window";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import { ColorModeContext } from "@components/ThemeWrapper";

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
	sessions: Session[];
	setSessions: Dispatch<SetStateAction<Session[]>>;
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
	sessions,
	setSessions,
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
					console.log("botMessage:", botMessage);
					if (botMessage.session_name) {
						var i = sessions.findIndex(
							(s) => s.id == currentSessionId
						);
						if (i !== -1) {
							const updatedSessions = sessions.map(
								(session, index) => {
									if (index === i) {
										// Return a new session object with the updated name
										return {
											...session,
											name: botMessage.session_name,
										};
									}
									return session;
								}
							);
							// Update the state with the new array
							setSessions(updatedSessions);
						}
					}
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
				created_at: new Date(),
			},
		]);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				// width: "43%",
				width: "50%",
				// background: theme.palette.primary.main,
				// background: "pink",
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
					FELIX Chat
				</Typography>
				{/* <IconButton
					sx={{ ml: 1 }}
					onClick={toggleColorMode}
					color="inherit"
				>
					{theme.palette.mode === "dark" ? (
						<Brightness7Icon />
					) : (
						<Brightness4Icon />
					)}
				</IconButton> */}
			</Box>
			<Box
				sx={{
					scrollBehavior: "smooth",
					display: "flex",
					flexDirection: "column-reverse",
					justifyContent: "end",
					alignItems: "center",
					flex: 1,
					overflow: "auto",
					gap: 2,
					// background: "lightgreen",
					width: "100%",
					"&::-webkit-scrollbar": {
						backgroundColor: theme.palette.primary.main,
						width: "14px",
					},
					"&::-webkit-scrollbar-track": {
						backgroundColor: theme.palette.primary.light,
					},
					"&::-webkit-scrollbar-thumb": {
						background: theme.palette.primary.dark,
						borderRadius: "16px",
						border: `4px solid ${theme.palette.primary.light}`,
					},
					"&::-webkit-scrollbar-button": {
						display: "none",
					},
				}}
			>
				<Box
					sx={{
						// background: "lightblue",
						width: "85%",
						display: "flex",
						flexDirection: "column",
						// justifyContent: "center",
						// alignItems: "center",
					}}
				>
					{messages.map((message, index) => {
						return (
							<Message
								key={index}
								message={message}
								chunks={
									isBotMessage(message) ? message.chunks : []
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

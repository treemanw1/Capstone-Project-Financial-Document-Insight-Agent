import React, { Dispatch, SetStateAction } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import { ChatMessage } from "interfaces";
import { useTheme } from "@mui/material";

interface MyComponentProps {
	currentQuery: string;
	setCurrentQuery: (query: string) => void;
	sendQuery: () => void;
	messages: ChatMessage[];
	setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
	sessionId: number;
}

const QueryField: React.FC<MyComponentProps> = ({
	currentQuery,
	setCurrentQuery,
	sendQuery,
	messages,
	setMessages,
	sessionId,
}) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: "flex",
				width: "90%",
				alignItems: "center",
				mb: 1,
				// background: "pink",
				border: 1,
				borderColor: theme.palette.text.primary,
				borderRadius: 2,
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
					width: "100%",
					"& .MuiOutlinedInput-root": {
						"& fieldset": {
							borderColor: "transparent",
						},
						"&:hover fieldset": {
							borderColor: "transparent",
						},
						"&.Mui-focused fieldset": {
							borderColor: "transparent",
						},
					},
				}}
			></TextField>
			<IconButton
				disableRipple
				onClick={() => {
					if (currentQuery != "") {
						sendQuery();
						setMessages(
							messages.concat({
								message: currentQuery,
								session_id: sessionId,
							})
						);
					}
				}}
			>
				<Send
					sx={{
						color: theme.palette.text.primary,
						"&:hover": { color: "#454F59" },
					}}
				/>
			</IconButton>
		</Box>
	);
};

export default QueryField;

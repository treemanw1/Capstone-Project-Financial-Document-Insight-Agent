import React from "react";
import { FixedSizeList } from "react-window";

import { Box, Button, Typography } from "@mui/material";
import { Query, Chunk } from "interfaces";

interface MyComponentProps {
	message: Query;
	chunk?: Chunk | undefined;
	setCurrentPage: (page: string) => void;
	listRef: React.RefObject<FixedSizeList>;
}

const Message: React.FC<MyComponentProps> = ({
	message,
	chunk,
	setCurrentPage,
	listRef,
}) => {
	const goToChunk = (pageNum: number) => {
		setCurrentPage(pageNum.toString());
		listRef.current?.scrollToItem(pageNum - 1, "start");
	};

	if (message.id % 2 == 0) {
		// User message
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "end",
					mb: 1,
				}}
			>
				<Box
					sx={{
						py: 1,
						px: 3,
						background: "#F1F1F1",
						borderRadius: 2,
						width: "fit-content",
					}}
				>
					<Typography key={message.id}>{message.text}</Typography>
				</Box>
			</Box>
		);
	} else {
		// LLM message
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					py: 1,
					px: 3,
					background: "#F1F1F1",
					borderRadius: 2,
					gap: 1,
					mb: 1,
				}}
			>
				<Typography sx={{ mb: 0 }} key={message.id}>
					{message.text}
				</Typography>
				<Button
					sx={{
						color: "black",
						textTransform: "none",
						p: 0,
						textAlign: "left",
						"&:hover": {
							backgroundColor: "#F1F1F1",
							textDecoration: "underline",
						},
					}}
					disableRipple
					onClick={() => goToChunk(chunk?.pageNum!)}
				>
					<Typography>
						Citation: "{chunk?.text}" (Page {chunk?.pageNum})
					</Typography>
				</Button>
				<Typography></Typography>
			</Box>
		);
	}
};

export default Message;

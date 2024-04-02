import React, { Dispatch, SetStateAction } from "react";
import { FixedSizeList } from "react-window";

import { Box, Button, ButtonBase, Typography } from "@mui/material";
import { ChatMessage, Chunk } from "interfaces";
import { AccountCircle, CloudCircle } from "@mui/icons-material";
import ChunkBox from "./ChunkBox";
import { useTheme } from "@mui/material";

interface MyComponentProps {
	message: ChatMessage;
	chunks: Chunk[];
	setHighlightedChunks: (chunks: Chunk[]) => void;
	setCurrentPage: (page: string) => void;
	listRef: React.RefObject<FixedSizeList>;
	setSelectedPDFID: Dispatch<SetStateAction<number | null>>;
}

function timeFormat(datetimeString: string): string {
	const date = new Date(datetimeString);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const period = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	return `${formattedHours}:${formattedMinutes} ${period}`;
}

const Message: React.FC<MyComponentProps> = ({
	message,
	chunks,
	setHighlightedChunks,
	setCurrentPage,
	listRef,
	setSelectedPDFID,
}) => {
	const theme = useTheme();
	const goToPage = (pageNum: number) => {
		setCurrentPage(pageNum.toString());
		listRef.current?.scrollToItem(pageNum - 1, "start");
	};

	const handleOnClick = (chunk: Chunk) => {
		setSelectedPDFID(chunk.pdf_id);
		setTimeout(() => goToPage(chunk.page_num + 1), 250);
		setHighlightedChunks(chunks!);
	};

	if (message.role == "user") {
		// User message
		return (
			<Box
				sx={{
					// width: "100%",
					// background: "pink",
					flexDirection: "column",
					display: "flex",
					// justifyContent: "flex-end",
					p: 2,
					pb: 4,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row-reverse",
						// background: "lightblue",
					}}
				>
					<AccountCircle
						sx={{
							fontSize: 45,
							color: "primary",
							ml: 1,
						}}
					/>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Typography
							textAlign="right"
							variant="h6"
							fontWeight="bold"
							sx={{ mb: -0.5 }}
						>
							You
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: theme.palette.text.secondary }}
						>
							{timeFormat(message.created_at.toString())}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						// background: theme.palette.primary.dark,
						background: "#E8F6FD",
						p: 2,
						mt: 1,
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10,
						borderBottomLeftRadius: 10,
						borderBottomRightRadius: 0,
					}}
				>
					<Typography variant="body1">{message.message}</Typography>
				</Box>
			</Box>
		);
	} else {
		// Bot message
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					p: 2,
					pb: 4,
					background: "",
				}}
			>
				<Box
					sx={{
						display: "flex",
						// background: "lightblue",
					}}
				>
					<CloudCircle
						sx={{ fontSize: 45, color: "secondary", mr: 1 }}
					/>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						<Typography
							variant="h6"
							fontWeight="bold"
							sx={{ mb: -0.5 }}
						>
							FELX AI
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: theme.palette.text.secondary }}
						>
							{message.created_at == undefined
								? ""
								: timeFormat(message.created_at.toString())}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						background: "#E8F6FD",
						p: 2,
						mt: 1,
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10,
						borderBottomLeftRadius: 0,
						borderBottomRightRadius: 10,
					}}
				>
					<Typography variant="body1">{message.message}</Typography>
					{chunks.length == 5 ? (
						<>
							<Typography
								fontSize={18}
								fontWeight="bold"
								sx={{
									textDecoration: "underline",
									my: 1,
								}}
							>
								Cited sources
							</Typography>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									// background: "pink",
									gap: 2,
								}}
							>
								<Box
									sx={{
										display: "flex",
										// background: "pink",
										justifyContent: "space-between",
										gap: 2,
									}}
								>
									<ChunkBox
										pdf_name={chunks[0].pdf_name}
										chunk_text={chunks[0].text}
										page_num={chunks[0].page_num}
										onClickChunk={() =>
											handleOnClick(chunks[0])
										}
									/>
									<ChunkBox
										pdf_name={chunks[1].pdf_name}
										chunk_text={chunks[1].text}
										page_num={chunks[1].page_num}
										onClickChunk={() =>
											handleOnClick(chunks[1])
										}
									/>
									<ChunkBox
										pdf_name={chunks[2].pdf_name}
										chunk_text={chunks[2].text}
										page_num={chunks[2].page_num}
										onClickChunk={() =>
											handleOnClick(chunks[2])
										}
									/>
								</Box>
								<Box sx={{ display: "flex", gap: 2 }}>
									<ChunkBox
										pdf_name={chunks[3].pdf_name}
										chunk_text={chunks[3].text}
										page_num={chunks[3].page_num}
										onClickChunk={() =>
											handleOnClick(chunks[3])
										}
									/>
									<ChunkBox
										pdf_name={chunks[4].pdf_name}
										chunk_text={chunks[4].text}
										page_num={chunks[4].page_num}
										onClickChunk={() =>
											handleOnClick(chunks[4])
										}
									/>
									<Box sx={{ flex: 1 }} />
								</Box>
							</Box>
						</>
					) : (
						<></>
					)}
				</Box>
			</Box>
		);
	}
};

export default Message;

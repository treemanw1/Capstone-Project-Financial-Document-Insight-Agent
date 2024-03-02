"use client";

import React from "react";

import { Box, TextField, Typography } from "@mui/material";
import { FixedSizeList } from "react-window";

const styles = {
	headerHeight: "8vh",
};

interface MyComponentProps {
	pdfs: Array<{
		id: number;
		name: string;
		numPages: number;
		path: string;
		currentPage: number;
	}>;
	selectedPDFID: number;
	displayPageNum: string;
	setDisplayPageNum: (value: string) => void;
	setCurrentPage: (pdfID: number, pageNum: number) => void;
	listRef: React.RefObject<FixedSizeList>;
}

const PageNumberDisplay: React.FC<MyComponentProps> = ({
	pdfs,
	selectedPDFID,
	displayPageNum,
	setDisplayPageNum,
	setCurrentPage,
	listRef,
}) => {
	return (
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
						pdfs.find((o) => o.id === selectedPDFID)?.numPages ?? 1;
					if (
						/^(?:[1-9]\d*)?$/.test(pageNumber) &&
						(parseInt(pageNumber) < maxPages + 1 ||
							pageNumber == "")
					) {
						const currPDFID: number =
							pdfs.find((o) => o.id === selectedPDFID)?.id ?? 0;
						setDisplayPageNum(pageNumber);
						setCurrentPage(currPDFID, parseInt(pageNumber));
					}
				}}
			/>
			<Typography sx={{ m: 2 }}>
				/{pdfs.find((o) => o.id === selectedPDFID)?.numPages}
			</Typography>
		</Box>
	);
};

export default PageNumberDisplay;

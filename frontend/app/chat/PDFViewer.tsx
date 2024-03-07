"use client";

import React, { useEffect, useState, useCallback, createRef } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Document, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { FixedSizeList as List, FixedSizeList } from "react-window";
import { useDebouncedCallback } from "use-debounce";

import { globalStyles } from "styles";
import style from "./chat.module.css";

import PageRenderer from "./PageRenderer";
import { PDF, Chunk } from "interfaces";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface MyComponentProps {
	pdf: PDF | null;
	chunks: Chunk[];
	currentPage: string;
	setCurrentPage: (page: string) => void;
	listRef: React.RefObject<FixedSizeList>;
}

const bodyHeightPercentage =
	1 - parseInt(globalStyles.headerHeight.slice(0, -2)) / 100;

function highlightPattern(text: string, patterns: string[]) {
	for (var i = 0; i < patterns.length; i++) {
		text = text.replace(patterns[i], (value) => `<mark>${value}</mark>`);
	}
	return text;
}

const PDFViewer: React.FC<MyComponentProps> = ({
	pdf,
	chunks,
	currentPage,
	setCurrentPage,
	listRef,
}) => {
	// const [currentPage, setCurrentPage] = useState<string>("1");
	const [pdfHeight, setPdfHeight] = useState<number>(
		typeof window !== "undefined"
			? window.innerHeight * bodyHeightPercentage
			: 640
	);

	useEffect(() => {
		function updateWidth() {
			setPdfHeight(window.innerHeight * bodyHeightPercentage);
		}
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	const debouncedScroll = useDebouncedCallback((visibleStopIndex) => {
		setCurrentPage((visibleStopIndex + 1).toString());
	}, 20);

	const handleInputPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const pageNumber: string = event.target.value;
		if (pageNumber == "") {
			setCurrentPage(pageNumber);
		} else if (
			/^(?:[1-9]\d*)?$/.test(pageNumber) &&
			parseInt(pageNumber) < pdf?.numPages! + 1
		) {
			setCurrentPage(pageNumber);
			listRef.current?.scrollToItem(
				parseInt(pageNumber == "" ? "0" : pageNumber) - 1,
				"start"
			);
		}
	};

	const textRenderer = useCallback(
		(textItem: { str: string }) => {
			const patterns = chunks
				.filter((o) => o.pageNum == parseInt(currentPage))
				.map((o) => o.text);
			return highlightPattern(textItem.str, patterns);
		},
		[currentPage]
	);

	return (
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
					height: globalStyles.headerHeight,
					borderBottom: 1,
				}}
			>
				<Typography sx={{ m: 2 }}>{pdf?.name}</Typography>
				<TextField
					sx={{
						display: "flex",
						justifyContent: "center",
						width: "60px",
						height: "40px",
						border: 1,
						"& fieldset": { border: "none" },
					}}
					value={currentPage.toString()}
					onChange={handleInputPage}
				/>
				<Typography sx={{ m: 2 }}>/{pdf?.numPages}</Typography>
			</Box>
			<Box
				sx={{
					background: "#F1F1F1",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					height: `calc(100vh - ${globalStyles.headerHeight})`,
					overflow: "clip",
				}}
			>
				<Document className={style.document} file={pdf?.path}>
					<List
						className={style.list}
						itemData={{ pdfHeight, textRenderer }}
						ref={listRef}
						height={pdfHeight}
						itemCount={pdf?.numPages!}
						itemSize={pdfHeight * 1.05}
						width={pdfHeight * 0.801}
						onItemsRendered={({ visibleStopIndex }) =>
							debouncedScroll(visibleStopIndex)
						}
					>
						{PageRenderer}
					</List>
				</Document>
			</Box>
		</Box>
	);
};

export default PDFViewer;

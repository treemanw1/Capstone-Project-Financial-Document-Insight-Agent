"use client";

import React, { useEffect, useState, createRef } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { Document, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { FixedSizeList as List, FixedSizeList } from "react-window";
import { useDebouncedCallback } from "use-debounce";

import { globalStyles } from "styles";
import style from "./chat.module.css";

import PageRenderer from "./PageRenderer";
import { PDF } from "interfaces";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface MyComponentProps {
	pdf: PDF | null;
}

const bodyHeightPercentage =
	1 - parseInt(globalStyles.headerHeight.slice(0, -2)) / 100;

const PDFViewer: React.FC<MyComponentProps> = ({ pdf }) => {
	const [currentPage, setCurrentPage] = useState<string>("1");
	const [pdfHeight, setPdfHeight] = useState<number>(
		window.innerHeight * bodyHeightPercentage
	);
	const listRef = createRef<FixedSizeList>();

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

	console.log("pdfHeight:", pdfHeight);

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
						itemData={{ pdfHeight }}
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

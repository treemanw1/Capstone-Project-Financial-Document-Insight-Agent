"use client";

import React, {
	useState,
	useEffect,
	createRef,
	PureComponent,
	Fragment,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { FixedSizeList as List, FixedSizeList } from "react-window";

import { Box, Typography, TextField } from "@mui/material";
import style from "./chat.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
	headerHeight: string;
}

const PDFViewer: React.FC<MyComponentProps> = ({
	pdfs,
	selectedPDFID,
	headerHeight,
}) => {
	const [displayPageNum, setDisplayPageNum] = useState<string>("1");

	const listRef = createRef<FixedSizeList>();

	// change to scroll only when we change in textfield
	// useEffect(() => {
	// 	if (parseInt(displayPageNum) > 1) {
	// 		listRef.current?.scrollToItem(parseInt(displayPageNum) - 1);
	// 	}
	// }, [displayPageNum]);

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
							pdfs.find((o) => o.id === selectedPDFID)
								?.numPages ?? 1;
						if (
							/^(?:[1-9]\d*)?$/.test(pageNumber) &&
							(parseInt(pageNumber) < maxPages + 1 ||
								pageNumber == "")
						) {
							console.log(pageNumber);
							const currPDFID: number = pdfs.find(
								(o) => o.id === selectedPDFID
							)?.id!;
							setDisplayPageNum(pageNumber);
							listRef.current?.scrollToItem(
								parseInt(pageNumber == "" ? "0" : pageNumber) -
									1,
								"start"
							);
							// setCurrentPage(currPDFID, parseInt(pageNumber));
						}
					}}
				/>
				<Typography sx={{ m: 2 }}>
					/{pdfs.find((o) => o.id === selectedPDFID)?.numPages}
				</Typography>
			</Box>
			<Box
				sx={{
					background: "#F1F1F1",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					height: `calc(100vh - ${headerHeight})`,
					overflow: "clip",
				}}
			>
				<Document
					className={style.document}
					file={pdfs.find((o) => o.id === selectedPDFID)?.path}
				>
					<List
						ref={listRef}
						height={640}
						itemCount={
							pdfs.find((o) => o.id === selectedPDFID)?.numPages!
						}
						itemSize={820}
						width={629}
						onItemsRendered={({ visibleStopIndex }) => {
							setDisplayPageNum(
								(visibleStopIndex + 1).toString()
							);
						}}
					>
						{({ index, style }) => (
							<Box sx={{ ...style }}>
								<Page
									key={`page_${index + 1}`}
									pageNumber={index + 1}
									renderAnnotationLayer={false}
								/>
							</Box>
						)}
					</List>
				</Document>
			</Box>
		</Box>
	);
};

export default PDFViewer;

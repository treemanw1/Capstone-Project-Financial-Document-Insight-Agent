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

import PageNumberDisplay from "./PageNumberDisplay";

import { Box } from "@mui/material";
import style from "./chat.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface MyComponentProps {
	pdfs: Array<{
		id: number;
		name: string;
		numPages: number;
		path: string;
		currentPage: number;
	}>;
	selectedPDFID: number;
	setDisplayPageNum: (value: string) => void;
	headerHeight: string;
	listRef: React.RefObject<FixedSizeList>;
}

const PDFViewer: React.FC<MyComponentProps> = ({
	pdfs,
	selectedPDFID,
	setDisplayPageNum,
	headerHeight,
	listRef,
}) => {
	// change to scroll only when we change in textfield
	// useEffect(() => {
	// 	listRef.current?.scrollToItem(parseInt(displayPageNum) - 1);
	// }, [displayPageNum]);

	return (
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
						setDisplayPageNum((visibleStopIndex + 1).toString());
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
	);
};

export default PDFViewer;

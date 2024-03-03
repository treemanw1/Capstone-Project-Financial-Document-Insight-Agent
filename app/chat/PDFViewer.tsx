"use client";

import React, {
	useState,
	useEffect,
	useRef,
	createRef,
	PureComponent,
	Fragment,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import { FixedSizeList as List, FixedSizeList } from "react-window";

import { Box, Typography, TextField } from "@mui/material";
import { globalStyles } from "styles";
import style from "./chat.module.css";

import { useDebouncedCallback } from "use-debounce";
import PageRenderer from "./PageRenderer";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDF {
	id: number;
	name: string;
	numPages: number;
	path: string;
}

interface MyComponentProps {
	pdf: PDF | null;
}

const PDFViewer: React.FC<MyComponentProps> = ({ pdf }) => {
	const [currentPage, setCurrentPage] = useState<string>("1");

	const listRef = createRef<FixedSizeList>();

	const debouncedScroll = useDebouncedCallback((visibleStopIndex) => {
		setCurrentPage((visibleStopIndex + 1).toString());
	}, 10);

	const handleInputPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const pageNumber: string = event.target.value;
		if (
			/^(?:[1-9]\d*)?$/.test(pageNumber) &&
			(parseInt(pageNumber) < pdf?.numPages! + 1 || pageNumber == "")
		) {
			setCurrentPage(pageNumber);
			listRef.current?.scrollToItem(
				parseInt(pageNumber == "" ? "0" : pageNumber) - 1,
				"start"
			);
		}
	};

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
						ref={listRef}
						height={640}
						itemCount={pdf?.numPages!}
						itemSize={820}
						width={629}
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

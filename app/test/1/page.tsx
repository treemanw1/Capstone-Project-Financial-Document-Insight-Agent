"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";

import { FixedSizeList } from "react-window";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Test1 = () => {
	const [state, setState] = useState<string>("");
	const [numPages, setNumPages] = useState<number | null>(null);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
	}

	return (
		<Box sx={{ p: 5, width: "100%", height: "100vh", background: "pink" }}>
			<Button
				onClick={() => {
					if (state === "clicked") {
						setState("");
					} else {
						setState("clicked");
					}
				}}
				sx={{ color: "black", textTransform: "none" }}
			>
				Button
			</Button>
			<Typography>State: {state}</Typography>
			<FixedSizeList
				height={640}
				itemCount={100}
				itemSize={820}
				width={629}
				// onItemsRendered={}
			>
				{({ index, style }) => (
					<Box sx={{ ...style }}>
						<Typography>Row: {index}</Typography>
					</Box>
				)}
			</FixedSizeList>
		</Box>
	);
};

export default Test1;

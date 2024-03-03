"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";

import { FixedSizeList } from "react-window";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Test = () => {
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
			<Document
				file="antifragile.pdf"
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<FixedSizeList
					height={640}
					itemCount={100}
					itemSize={820}
					width={629}
				>
					{({ index, style }) => (
						<Box sx={{ ...style }}>
							<Page
								key={`page_${index + 1}`}
								pageNumber={index + 1}
								renderAnnotationLayer={false}
								// onRenderSuccess={() => console.log("Page rendered")}
							/>
						</Box>
					)}
				</FixedSizeList>
			</Document>
		</Box>
	);
};

export default Test;

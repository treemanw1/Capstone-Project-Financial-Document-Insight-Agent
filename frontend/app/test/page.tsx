"use client";

import React from "react";
import PDFViewer from "app/chat/(components)/PDFViewer";
import { Box, TextField, Input, Select, Typography } from "@mui/material";
import { Document, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import PageRenderer from "../chat/(components)/PageRenderer";
import { FixedSizeList as List, FixedSizeList } from "react-window";

const page = () => {
	return (
		<Box sx={{ background: "pink", width: "100vw" }}>
			<Typography variant="h4">PDF Viewer</Typography>
		</Box>
	);
};

export default page;

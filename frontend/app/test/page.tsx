"use client";

import React from "react";
import PDFViewer from "app/chat/(components)/PDFViewer";
import { Box, TextField, Input, Select } from "@mui/material";

const page = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column-reverse",
				height: "100px",
				overflow: "auto",
			}}
		>
			<div>Bottom</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Hi</div>
			<div>Top</div>{" "}
		</Box>
	);
};

export default page;

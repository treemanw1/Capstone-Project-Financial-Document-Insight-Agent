import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
} from "@mui/material";
import { PDF, Chunk } from "interfaces";
import { SelectChangeEvent } from "@mui/material";

interface MyComponentProps {
	pdfs: PDF[] | null;
	setSelectedPDFID: Dispatch<SetStateAction<number | null>>;
	pdf: PDF | null;
	// highlightedChunks: Chunk[];
	// currentPage: string;
	// setCurrentPage: (page: string) => void;
}

const PDFDropdown: React.FC<MyComponentProps> = ({
	pdfs,
	setSelectedPDFID,
	pdf,
}) => {
	useEffect(() => {
		if (pdfs) {
			setDisplayPDF(pdfs[0].id.toString());
		}
	}, [pdfs]);

	const [displayPDF, setDisplayPDF] = React.useState<string>("");

	return (
		<Box sx={{ width: "70%", overflow: "clip", m: 2 }}>
			<FormControl sx={{ width: "100%" }}>
				<Select
					sx={{ background: "white" }}
					MenuProps={{
						PaperProps: {
							style: {
								width: "100px",
								// marginLeft: 0,
								// marginRight: "auto",
							},
						},
					}}
					value={displayPDF}
					onChange={(event: SelectChangeEvent) => {
						setDisplayPDF(event.target.value);
						setSelectedPDFID(parseInt(event.target.value));
					}}
					displayEmpty
				>
					{pdfs?.map((pdf) => (
						<MenuItem sx={{ maxWidth: "100%" }} value={pdf.id}>
							<Typography sx={{ overflow: "clip" }}>
								{pdf.pdf_document_name}
							</Typography>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};

export default PDFDropdown;

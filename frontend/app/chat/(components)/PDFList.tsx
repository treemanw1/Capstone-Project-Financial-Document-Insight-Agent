import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Typography } from "@mui/material";

import { useTheme } from "@mui/material";
import { globalStyles } from "styles";
import { PDF } from "interfaces";

import style from "../../layout.module.css";

interface MyComponentProps {
	pdfs: PDF[] | null;
	setSelectedPDFID: Dispatch<SetStateAction<number | null>>;
}

const PDFList: React.FC<MyComponentProps> = ({ pdfs, setSelectedPDFID }) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				display: "flex",
				// background: "pink",
				borderLeft: 1,
				borderColor: theme.palette.text.primary,
				flexDirection: "column",
				width: "14%",
			}}
		>
			<Box
				sx={{
					height: globalStyles.headerHeight,
					borderBottom: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography variant="body1">Filtered documents</Typography>
			</Box>
			{pdfs == null ? (
				<Typography>Loading...</Typography>
			) : (
				pdfs.map((pdf) => {
					return (
						<Button
							key={pdf.id}
							onClick={() => {
								setSelectedPDFID(pdf.id);
							}}
							sx={{
								display: "flex",
								justifyContent: "flex-start",
								color: theme.palette.text.primary,
								textTransform: "none",
								borderBottom: 1,
								borderColor: theme.palette.text.primary,
								borderRadius: 0,
								"&:hover": {
									background: theme.palette.primary.dark,
								},
							}}
						>
							<Typography
								lineHeight={1.2}
								fontSize="1.5vh"
								noWrap
								sx={{
									flex: "auto",
									// background: "lightblue",
									width: "",
								}}
							>
								{pdf.pdf_document_name}
							</Typography>
						</Button>
					);
				})
			)}
		</Box>
	);
};

export default PDFList;

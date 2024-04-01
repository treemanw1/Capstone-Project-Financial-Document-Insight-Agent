import React from "react";
import { Box } from "@mui/material";

interface MyComponentProps {
	pdf_name: string;
	chunk_text: string;
	page_num: number;
}

const ChunkBox: React.FC<MyComponentProps> = () => {
	return <Box></Box>;
};

export default ChunkBox;

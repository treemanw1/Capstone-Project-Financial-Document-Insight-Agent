import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { Chunk } from "interfaces";
import style from "../../layout.module.css";

interface MyComponentProps {
	pdf_name: string;
	chunk_text: string;
	page_num: number;
	onClickChunk: () => void;
}

const ChunkBox: React.FC<MyComponentProps> = ({
	pdf_name,
	chunk_text,
	page_num,
	onClickChunk,
}) => {
	const theme = useTheme();

	return (
		<ButtonBase
			sx={{
				display: "flex",
				flex: 1,
				// background: "red",
			}}
			onClick={() => onClickChunk()}
		>
			<Box
				sx={{
					display: "flex",
					height: "12.5vh",
					flex: 1,
					// background: "lightblue",
				}}
			>
				<Box
					sx={{
						display: "flex",
						background: "#2052B5",
						// background: "pink",
						borderTopLeftRadius: 10,
						borderBottomLeftRadius: 10,
						width: "3px",
					}}
				/>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						flexDirection: "column",
						justifyContent: "space-between",
						background: theme.palette.primary.dark,
						"&:hover": { background: theme.palette.primary.light },
						transition: ".1s",
						borderTopRightRadius: 10,
						borderBottomRightRadius: 10,
						p: 1,
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							// background: "pink",
						}}
					>
						<Typography
							className={style.font}
							fontWeight="bold"
							variant="body2"
							sx={{
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
								maxWidth: "6vw",
							}}
						>
							{pdf_name}
						</Typography>
						<Typography
							className={style.font}
							sx={{ minWidth: "2vw" }}
							variant="caption"
						>
							p. {page_num + 1}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							// background: "pink",
							overflow: "clip",
							width: "130px",
						}}
					>
						<Typography
							className={style.font}
							textAlign="left"
							variant="caption"
							style={{
								// textOverflow: "ellipsis",
								overflow: "clip",
								height: "40px",
							}}
						>
							{chunk_text}
						</Typography>
					</Box>
				</Box>
			</Box>
		</ButtonBase>
	);
};

export default ChunkBox;

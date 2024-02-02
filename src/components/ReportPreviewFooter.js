import React from "react";
import { Box, Button, Divider, Grid, Icon, Typography } from "@mui/material";
import { globalStyles } from "../GlobalStyles";

const ReportPreviewFooter = () => {
	return (
		<>
			<Divider />
			<Box
				sx={{
					// mx: globalStyles.mx,
					display: "flex",
					alignItems: "center",
					height: "7vh",
					justifyContent: "flex-end",
					backgroundColor: "black",
					width: "100%",
				}}
			>
				qSqsqsqsq
				<Typography
					sx={{
						backgroundColor: "Black",
						width: "500px",
						fontSize: "13px",
					}}
				>
					Copyright © 2023 DC Frontiers. All rights reserved.qSqsqS
				</Typography>
				<Box
					sx={{
						justifyContent: "center",
						display: "flex",
						width: "400px",
						backgroundColor: "Black",
					}}
				>
					<Typography sx={{ fontSize: "13px", mr: "15px" }}>
						Terms of Use
					</Typography>
					<Typography sx={{ fontSize: "13px" }}>
						Privacy Policy
					</Typography>
				</Box>
				<Typography
					align="right"
					sx={{ fontSize: "13px", width: "400px" }}
				>
					Powered by Handshakes
				</Typography>
			</Box>
		</>
	);
};

export default ReportPreviewFooter;

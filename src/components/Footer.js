import React from "react";
import { Box, Button, Divider, Grid, Icon, Typography } from "@mui/material";
import { globalStyles } from "../GlobalStyles";

const Footer = () => {
	return (
		<>
			<Divider />
			<Box
				sx={{
					mx: globalStyles.mx,
					display: "flex",
					alignItems: "center",
					height: "7vh",
					justifyContent: "space-between",
					backgroundColor: "",
				}}
			>
				<Typography
					sx={{
						backgroundColor: "",
						width: "400px",
						fontSize: "13px",
					}}
				>
					Copyright © 2023 DC Frontiers. All rights reserved.
				</Typography>
				<Box
					sx={{
						justifyContent: "center",
						display: "flex",
						width: "400px",
						backgroundColor: "",
					}}
				>
					<Typography sx={{ fontSize: "13px" }}>
						Terms of Use
					</Typography>
					<Divider sx={{ width: "15px", height: 0 }} />
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

export default Footer;

import React from "react";
import { Box, Button, Divider, Grid, Icon, Typography } from "@mui/material";
import { globalStyles } from "styles";

const Footer = () => {
	return (
		<Box sx={{ background: "", justifySelf: "flex-end", width: "100%" }}>
			<Divider sx={{}} />
			<Box
				sx={{
					mx: globalStyles.mx,
					display: "flex",
					alignItems: "center",
					height: globalStyles.footerHeight,
					justifyContent: "space-between",
					// background: "pink",
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
					<Typography sx={{ fontSize: "13px", mr: "15px" }}>
						Terms of Use
					</Typography>
					<Typography sx={{ fontSize: "13px" }}>
						Privacy Policy
					</Typography>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Typography
						align="right"
						sx={{ fontSize: "13px", width: "400px", mr: 1 }}
					>
						Powered by
					</Typography>
					<img height={13} src="/handshakes.png"></img>
				</Box>
			</Box>
		</Box>
	);
};

export default Footer;

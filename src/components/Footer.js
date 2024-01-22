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
					height: "10vh",
					justifyContent: "space-between",
					backgroundColor: "",
				}}
			>
				<Typography
					sx={{
						backgroundColor: "",
						width: "400px",
						fontSize: "16px",
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
					<Typography>Terms of Use</Typography>
					<Divider sx={{ width: "15px", height: 0 }} />
					<Typography>Privacy Policy</Typography>
				</Box>
				<Typography align="right" sx={{ width: "400px" }}>
					Powered by Handshakes
				</Typography>
			</Box>
			{/* <Grid
				container
				direction="row"
				sx={{
					height: "75px",
					mx: globalStyles.mx,
					backgroundColor: "pink",
				}}
			>
				<Grid item xs={4}>
					<Typography>
						Copyright © 2023 DC Frontiers. All rights reserved.
					</Typography>
				</Grid>
				<Grid item xs={4} sx={{ justifySelf: "center" }}>
					<Box
						sx={{
							justifySelf: "center",
							display: "flex",
							backgroundColor: "blue",
						}}
					>
						<Typography>Terms of Use</Typography>
						<Divider sx={{ width: "15px", height: 0 }} />
						<Typography>Privacy Policy</Typography>
					</Box>
				</Grid>
				<Grid item xs={4}>
					<Typography>Powered by Handshakes</Typography>
				</Grid>
			</Grid> */}
		</>
	);
};

export default Footer;

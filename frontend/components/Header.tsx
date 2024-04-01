import React from "react";
import { Box, Divider, Icon, Link, Typography } from "@mui/material";
import { globalStyles } from "../styles";
import NextLink from "next/link";

const Header = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				justifyContent: "center",
				height: globalStyles.headerHeight,
				color: "white",
				background:
					"linear-gradient(to right bottom, #04223E, #1A88C5)",
				// background: "pink",
			}}
		>
			<Box
				sx={{
					display: "flex",
					px: globalStyles.mx,
					justifyContent: "space-between",
					alignItems: "center",
					height: "100%",
					// background: "pink",
				}}
			>
				<Link
					component={NextLink}
					href="/chat"
					underline="hover"
					variant="body1"
					// color="black"
				>
					Chat
				</Link>
				<Typography>Hello, Superadmin</Typography>
				{/* <Icon /> */}
			</Box>
			{/* <Divider sx={{ width: "100%", background: "darkblue" }} /> */}
		</Box>
	);
};

export default Header;

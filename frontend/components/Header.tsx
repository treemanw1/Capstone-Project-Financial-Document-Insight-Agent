import React from "react";
import { Box, Divider, Icon, Link, Typography } from "@mui/material";
import { globalStyles } from "../styles";
import NextLink from "next/link";

const Header = () => {
	return (
		<Box>
			<Box sx={{ mx: globalStyles.mx, backgroundColor: "" }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						// background: "lightblue",
						height: globalStyles.headerHeight,
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							width: "28%",
							// background: "pink",
						}}
					>
						<Link
							component={NextLink}
							href="/"
							underline="hover"
							color="black"
							variant="body1"
						>
							Home
						</Link>
						<Link
							component={NextLink}
							href="/advanced-search"
							underline="hover"
							color="black"
							variant="body1"
						>
							Advanced Search
						</Link>
						<Link
							component={NextLink}
							href="/saved-reports"
							underline="hover"
							color="black"
							variant="body1"
						>
							Saved Reports
						</Link>
					</Box>
					<Box
						sx={{
							display: "flex",
							// background: "pink",
							marginLeft: "auto",
						}}
					>
						<Typography>Hello, Cleopatra</Typography>
						<Icon />
					</Box>
				</Box>
			</Box>
			<Divider />
		</Box>
	);
};

export default Header;

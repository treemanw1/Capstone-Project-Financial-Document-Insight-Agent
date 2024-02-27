import React from "react";
import { Box, Divider, Link, Icon } from "@mui/material";
import { globalStyles } from "../GlobalStyles";

const Header = () => {
	return (
		<Box>
			<Box sx={{ mx: globalStyles.mx, backgroundColor: "" }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						// background: "lightblue",
						height: `${globalStyles.headerHeight}vh`,
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
						<Link href="/" underline="hover" color="black">
							Home
						</Link>
						<Link
							href="/advanced-search"
							underline="hover"
							color="black"
						>
							Advanced Search
						</Link>
						<Link
							href="saved-reports"
							underline="hover"
							color="black"
						>
							Saved Reports
						</Link>
					</Box>
					<Box sx={{ marginLeft: "auto" }}>
						<a>Hello, Cleopatra</a>
						<Icon />
					</Box>
				</Box>
			</Box>
			<Divider />
		</Box>
	);
};

export default Header;

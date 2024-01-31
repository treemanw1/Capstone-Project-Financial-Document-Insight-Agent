import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDropdown from "../components/RoundedDropdown";
import {
	Box,
	Divider,
	Typography,
	FormControl,
	InputLabel,
	NativeSelect,
	Button,
	TextField,
} from "@mui/material";
import { globalStyles } from "../GlobalStyles";

export const AdvancedSearch = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				maxHeight: "100vh",
				justifyContent: "space-between",
				backgroundColor: "",
			}}
		>
			<Header />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					mx: globalStyles.mx,
					backgroundColor: "",
					height: `${
						100 -
						globalStyles.footerHeight -
						globalStyles.headerHeight
					}vh`,
				}}
			>
				<Typography
					lineHeight={1.1}
					sx={{ mt: "20px", fontSize: "16px" }}
				>
					Advanced Search
				</Typography>
				<Typography
					sx={{
						fontSize: "12px",
						width: "85%",
						mt: "16px",
					}}
				>
					Document Type
				</Typography>
				<Box
					sx={{
						display: "flex",
						mt: "8px",
					}}
				>
					<RoundedDropdown
						headerText="Select document type"
						placeHolder="Document Type"
						options={["Type 1", "Type 2", "Type 3"]}
						width="300px"
						height="34px"
					/>
					<Divider sx={{ width: 0, mr: "10px" }} />
					<RoundedDropdown
						headerText={"Select document sub-type"}
						placeHolder={"Document Sub-type"}
						options={["Type 1", "Type 2", "Type 3"]}
						width="300px"
						height="34px"
					/>
				</Box>
				<Typography sx={{ fontSize: "12px", mt: "16px", width: "85%" }}>
					Date Range
				</Typography>
				<Box
					sx={{
						display: "flex",
						mt: "8px",
					}}
				>
					<RoundedDropdown
						headerText={"Select date type"}
						placeHolder={"Date Type"}
						options={["Type 1", "Type 2", "Type 3"]}
						width="300px"
						height="34px"
					/>
					<Divider sx={{ width: 0, mr: "10px" }} />
					<RoundedDropdown
						headerText={"Select start date"}
						placeHolder={"Start Date"}
						options={["Type 1", "Type 2", "Type 3"]}
						width="300px"
						height="34px"
					/>
					<Divider sx={{ width: 0, mr: "10px" }} />
					<RoundedDropdown
						headerText={"Select end date"}
						placeHolder={"End Date"}
						options={["Type 1", "Type 2", "Type 3"]}
						width="300px"
						height="34px"
					/>
				</Box>
				<Box>
					<Typography
						sx={{
							flex: 1,
							fontSize: "12px",
							width: "85%",
							mb: "8px",
							mt: "16px",
						}}
					>
						Status
					</Typography>
					<RoundedDropdown
						headerText={"Select Status"}
						placeHolder={"Status"}
						options={["Type 1", "Type 2", "Type 3"]}
						width="300px"
						height="34px"
					/>
				</Box>
				<Box>
					<Typography
						sx={{
							fontSize: "12px",
							width: "85%",
							mt: "16px",
						}}
					>
						Search Keywords and/or Phrases
					</Typography>
				</Box>
				<Box>
					<Box
						sx={{
							display: "flex",
							mt: "8px",
						}}
					>
						<RoundedDropdown
							headerText={"Where keyword is found"}
							placeHolder={"Please select "}
							options={["Type 1", "Type 2", "Type 3"]}
							width="300px"
							height="34px"
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							mt: "8px",
							justifyContent: "space-between",
							width: "950px",
						}}
					>
						<RoundedDropdown
							headerText={"Where phrases is found"}
							placeHolder={"Please select "}
							options={["Type 1", "Type 2", "Type 3"]}
							width="300px"
							height="34px"
						/>
					</Box>
					<Button
						type="submit"
						title="Test"
						variant="contained"
						color="secondary"
						sx={{
							borderRadius: 60,
							backgroundColor: "silver",
							textTransform: "none",
							minWidth: 200,
							color: "black",
							mb: "30px",
							mt: "24px",
							fontSize: "12px",
						}}
					>
						Search
					</Button>
				</Box>
			</Box>
			<Footer />
		</Box>
	);
};

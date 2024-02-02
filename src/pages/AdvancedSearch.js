import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDropdown from "../components/RoundedDropdown";
import RoundButton from "../components/RoundButton";
import { Box, Divider, Typography, Button } from "@mui/material";
import { globalStyles } from "../GlobalStyles";
import SearchField from "../components/SearchField";
import DateDropdown from "../components/DateDropdown";

const styles = {
	fontSize: "1.5vh",
};

export const AdvancedSearch = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

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
					justifyContent: "space-between",
				}}
			>
				<Typography
					lineHeight={1.1}
					sx={{
						mt: "20px",
						fontSize: "3vh",
						background: "",
					}}
				>
					Advanced Search
				</Typography>

				<Box sx={{ background: "" }}>
					<Typography
						sx={{
							fontSize: "2.2vh",
							mb: "6px",
						}}
					>
						Document Type
					</Typography>
					<Box sx={{ display: "flex" }}>
						<RoundedDropdown
							headerText="Select document type"
							placeHolder="Document Type"
							options={["Type 1", "Type 2", "Type 3"]}
							width="300px"
							height="34px"
							fontSize={styles.fontSize}
						/>
						<Divider sx={{ width: 0, mr: "15px" }} />
						<RoundedDropdown
							headerText={"Select document sub-type"}
							placeHolder={"Document Sub-type"}
							options={["Type 1", "Type 2", "Type 3"]}
							width="300px"
							height="34px"
							fontSize={styles.fontSize}
						/>
					</Box>
				</Box>

				<Box sx={{ background: "" }}>
					<Typography sx={{ fontSize: "2.2vh", mb: "6px" }}>
						Date Range
					</Typography>
					<Box
						sx={{
							display: "flex",
						}}
					>
						<RoundedDropdown
							headerText={"Select date type"}
							placeHolder={"Date Type"}
							options={["Type 1", "Type 2", "Type 3"]}
							width="300px"
							height="34px"
							fontSize={styles.fontSize}
						/>
						<Divider sx={{ width: 0, mr: "15px" }} />
						<DateDropdown
							props={{
								title: "Select start date",
								label: "Start Date",
								date: startDate,
								onChange: (d) => setStartDate(d),
								width: "300px",
								height: "34px",
								mt: "-6px",
								titleFontSize: styles.fontSize,
								inputFontSize: "11px",
							}}
						/>
						<Divider sx={{ width: 0, mr: "15px" }} />
						<DateDropdown
							props={{
								title: "Select end date",
								label: "End Date",
								date: endDate,
								onChange: (d) => setEndDate(d),
								width: "300px",
								height: "34px",
								mt: "-5.5px",
								titleFontSize: styles.fontSize,
								inputFontSize: "11px",
							}}
						/>
					</Box>
				</Box>

				<Box sx={{ background: "" }}>
					<Typography
						sx={{
							flex: 1,
							fontSize: "2.2vh",
							mb: "6px",
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
						fontSize={styles.fontSize}
					/>
				</Box>

				<Box sx={{ background: "", mb: "15px" }}>
					<Typography
						sx={{
							fontSize: "2.2vh",
							mb: "6px",
						}}
					>
						Search Keywords and/or Phrases
					</Typography>
					<Box
						sx={{
							display: "flex",
							mb: "8px",
						}}
					>
						<SearchField
							props={{
								title: "Search for keyword",
								fontSize: styles.fontSize,
								width: "60vh",
								height: "34px",
							}}
						/>
						<Divider sx={{ width: 0, mr: "15px" }} />
						<RoundedDropdown
							headerText={"Where keyword is found"}
							placeHolder={"Please select "}
							options={["Type 1", "Type 2", "Type 3"]}
							width="300px"
							height="34px"
							fontSize={styles.fontSize}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
						}}
					>
						<SearchField
							props={{
								title: "Search for phrases",
								fontSize: styles.fontSize,
								width: "60vh",
								height: "34px",
							}}
						/>
						<Divider sx={{ width: 0, mr: "15px" }} />
						<RoundedDropdown
							headerText={"Where phrases is found"}
							placeHolder={"Please select "}
							options={["Type 1", "Type 2", "Type 3"]}
							width="300px"
							height="34px"
							fontSize={styles.fontSize}
						/>
					</Box>
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
						width: "30vh",
						fontSize: "12px",
						color: "black",
					}}
				>
					Search
				</Button>
			</Box>
			<Box sx={{ height: "7.5vh", background: "" }} />
			<Footer />
		</Box>
	);
};

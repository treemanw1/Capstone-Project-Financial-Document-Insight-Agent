import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoundedDropdown from "../components/RoundedDropdown";
import {
	Box,
	Divider,
	Typography,
	Button,
	Grid,
	TextField,
} from "@mui/material";
import { globalStyles } from "../GlobalStyles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
	{ field: "reportName", headerName: "Report Name", width: 500 },
	{
		field: "reportDescription",
		headerName: "Report Description",
		width: 300,
	},
	{ field: "noOfDocuments", headerName: "No of Documents", width: 200 },
	{ field: "lastSaved", headerName: "Last Saved", width: 200 },
	{
		field: "openReport",
		headerName: "",
		width: 200,
		renderCell: (params) => (
			<Button
				type="submit"
				color="primary"
				sx={{
					borderRadius: 15,
					backgroundColor: "lightgrey",
					color: "black",
				}}
			>
				Open Report
			</Button>
		),
	},
];

const rows = [
	{
		id: 1,
		reportName: "ABC Holdings Reference for Project A",
		reportDescription: "Director conflict of interest",
		noOfDocuments: 3,
		lastSaved: "21 Nov 2023",
	},
	{
		id: 2,
		reportName: "ABC Holdings Reference for Project B",
		reportDescription: "Financial statements",
		noOfDocuments: 12,
		lastSaved: "21 Nov 2023",
	},
];

export const SavedReports = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				backgroundColor: "",
			}}
		>
			<Header />
			<Box sx={{ mx: globalStyles.mx, backgroundColor: "" }}>
				<Box sx={{ mt: 5 }}>
					<Typography lineHeight={1.1} sx={{ fontSize: "20px" }}>
						<b>Saved Reports</b>
					</Typography>
				</Box>
			</Box>
			<Grid
				container
				spacing={1}
				sx={{ mx: globalStyles.mx, mt: 2, alignItems: "center" }}
			>
				<Grid item xs={12} sm={2} marginTop={1}>
					<RoundedDropdown
						label="Document Type"
						options={[
							{
								value: "option1",
								label: "Company Announcements",
							},
							{ value: "option2", label: "Annual Reports" },
							{
								value: "option3",
								label: "General Announcements",
							},
						]}
						onChange={(event) => {
							console.log(event);
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						{/* <DemoContainer
							components={["SingleInputDateRangeField"]}
						>
							<DateRangePicker
								slots={{ field: SingleInputDateRangeField }}
								name="allowedRange"
							/>
						</DemoContainer> */}
					</LocalizationProvider>
				</Grid>
				<Grid item xs={12} sm={5}>
					<TextField
						fullWidth
						id="keyword"
						label=""
						variant="outlined"
						margin="normal"
					/>
				</Grid>
				<Grid item xs={12} sm={2} marginTop={1}>
					<Button
						type="submit"
						color="primary"
						sx={{
							height: 55,
							borderRadius: 6,
							backgroundColor: "lightgrey",
							color: "black",
						}}
					>
						Search
					</Button>
				</Grid>
			</Grid>

			<Box
				sx={{
					mx: globalStyles.mx,
					backgroundColor: "",
					mt: 5,
					flexGrow: 1,
				}}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					autoHeight
				/>
			</Box>
			<Box sx={{ bottom: 0, backgroundColor: "" }}>
				<Footer />
			</Box>
		</Box>
	);
};

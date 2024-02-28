import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReportPreviewFooter from "../components/ReportPreviewFooter";
import RoundedDropdown from "../components/RoundedDropdown";
import {
	Box,
	Divider,
	Typography,
	FormControl,
	InputLabel,
	NativeSelect,
	Button,
	Modal,
	Popper,
	handleOpen,
	handleClose,
	open,
	Alert,
	Stack,
	Snackbar,
	Grid,
	Checkbox,
	FormControlLabel,
	TextField,
	SnackbarContent,
} from "@mui/material";
import { globalStyles } from "../GlobalStyles";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 900,
	height: 450,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export const ReportPreview = () => {
	const [open, setOpen] = React.useState(false);
	const [snackbaropen, setSnackBarOpen] = React.useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleSnackBarOpen = () => setSnackBarOpen(true);
	const handleSnackBarClose = () => setSnackBarOpen(false);
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 900,
		height: 600,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
	};
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const opened = Boolean(anchorEl);
	const id = opened ? "simple-popper" : undefined;
	const handleSnackBarModalClose = () => {
		handleClose();
		handleClickSnackBar();
	};

	const action = (
		<React.Fragment>
			<Button color="primary" size="small" onClick={handleSnackBarClose}>
				X
			</Button>
		</React.Fragment>
	);

	function handleClickSnackBar() {
		setSnackBarOpen(true);
	}

	const message = "First line  Second Line";

	const tableStyles = {
		borderCollapse: "collapse",
		width: "100%",
	};

	const cellStyles = {
		border: "1px solid #ddd",
		padding: "20px",
		textAlign: "left",
	};

	const headerCellStyles = {
		...cellStyles,
		backgroundColor: "#f1f1f1",
		fontWeight: "bold",
	};

	const tableData = [
		{
			number: "1",
			companyName: "ABC Holdings",
			documentType: "Company Announcements",
			dateTime: "21 Nov 2023 01:15 PM",
			pageNumber: 39,
			reference:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim dest.",
		},
		{
			number: "2",
			companyName: "ABC Holdings",
			documentType: "Company Announcements",
			dateTime: "21 Nov 2023 01:15 PM",
			pageNumber: 2,
			reference:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim dest.",
		},
		{
			number: "3",
			companyName: "ABC Holdings",
			documentType: "Company Announcements",
			dateTime: "21 Nov 2023 01:15 PM",
			pageNumber: 121,
			reference:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim dest.",
		},
	];

	function Table() {
		return (
			<table style={tableStyles}>
				<thead>
					<tr>
						<td style={headerCellStyles}>Number</td>
						<td style={headerCellStyles}>Company Name</td>
						<td style={headerCellStyles}>
							Document Title / Document Type
						</td>
						<td style={headerCellStyles}>Date / Time</td>
						<td style={headerCellStyles}>Page Number</td>
						<td style={headerCellStyles}>Reference</td>
					</tr>
				</thead>
				<tbody>
					{tableData.map((row, index) => (
						<tr key={index}>
							<td style={cellStyles}>{row.number}</td>
							<td style={cellStyles}>{row.companyName}</td>
							<td style={cellStyles}>{row.documentType}</td>
							<td style={cellStyles}>{row.dateTime}</td>
							<td style={cellStyles}>{row.pageNumber}</td>
							<td style={cellStyles}>{row.reference}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<Header />
				<Box
					sx={{
						// display: "flex",
						mx: globalStyles.mx,
						backgroundColor: "pink",
						height: `${
							100 -
							globalStyles.footerHeight -
							globalStyles.headerHeight
						}vh`,
					}}
				>
					<Box
						sx={{
							width: "100%",
							mt: "3vh",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Typography lineHeight={1.1} sx={{ fontSize: "20px" }}>
							Report Preview
						</Typography>
						<Divider sx={{ height: "30px", width: 0 }} />
						<Box>
							<Button
								sx={{
									textTransform: "None",
									color: "black",
									fontSize: "16px",
									lineHeight: "1.1",
									fontWeight: "lighter",
								}}
							>
								{" "}
								Delete Report
							</Button>
							<Button
								sx={{
									textTransform: "None",
									color: "black",
									fontSize: "16px",
									lineHeight: "1.1",
								}}
							>
								{" "}
								Enhance Report
							</Button>
						</Box>
					</Box>

					<Divider sx={{ height: "30px", width: 0 }} />

					<Typography>1 Document</Typography>
					<Divider sx={{ height: "30px", width: 0 }} />
					<Grid>
						<Table />
					</Grid>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						width: "95%",
					}}
				>
					<Stack sx={{ width: "100%" }} spacing={2}>
						{/*} <Alert
            severity="success"
            action={
            <Button color="inherit" size="small">
            UNDO
            </Button>
            }
      >
            This Alert uses a Button component for its action.
        </Alert>*/}
					</Stack>

					<Box
						sx={{
							display: "flex",
							width: " 590px",
							justifyContent: "space-between",
						}}
					>
						{/*<Button onClick={handleOpen} variant = "contained" color="secondary" sx={ { borderRadius: 60, backgroundColor: 'LightGray', textTransform: 'none', minWidth:200, color:'black'}}>Save Report</Button>*/}
						<Modal
							open={open}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={style}>
								{/*} <Box sx={{display:'flex',justifyContent:"space-between"}}>*/}
								<Box sx={{ justifySelf: "center" }}>
									<Typography
										id="modal-modal-title"
										variant="h6"
										component="h2"
										align="center"
										justifySelf="center"
									>
										Save Report
									</Typography>
								</Box>
								<Box sx={{ justifySelf: "end" }}>
									<Button
										onClick={handleClose}
										sx={{ color: "black" }}
									>
										{" "}
										Close{" "}
									</Button>
								</Box>
								{/*</Box>*/}

								<Divider
									sx={{ borderBottomWidth: 1.5 }}
									style={{ background: "black" }}
								/>
								<Typography
									id="modal-modal-description"
									sx={{ mt: 2 }}
								>
									How do you want to save your report?
								</Typography>
								<Divider sx={{ height: "15px", width: 0 }} />
								<Box>
									<FormControlLabel
										control={<Checkbox defaultChecked />}
										label="Save as new report"
									/>
									<Divider
										sx={{ height: "10px", width: 0 }}
									/>
									<TextField
										id="outlined-helperText"
										defaultValue="Report Name"
										helperText="Characters allowed: letters, numbers and _."
										sx={{ width: "700px" }}
									/>
									<Divider
										sx={{ height: "30px", width: 0 }}
									/>
									<TextField
										id="outlined-helperText"
										label=""
										defaultValue="Report Description(optional)"
										helperText="Characters allowed: letters, numbers and _."
										sx={{ width: "700px" }}
									/>
								</Box>
								<Divider sx={{ height: "30px", width: 0 }} />
								<FormControlLabel
									control={<Checkbox defaultChecked />}
									label="Save and add to existing report"
								/>
								<Divider sx={{ height: "15px", width: 0 }} />
								{
									<RoundedDropdown
										headerText={""}
										placeHolder={"Select report"}
										options={[
											{
												value: "option1",
												label: "Option 1",
											},
											{
												value: "option2",
												label: "Option 2",
											},
											{
												value: "option3",
												label: "Option 3",
											},
										]}
										width={"700px"}
									/>
								}
								<Divider sx={{ height: "50px", width: 0 }} />
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-evenly",
									}}
								>
									<Button
										onClick={handleClose}
										variant="contained"
										color="secondary"
										sx={{
											borderRadius: 60,
											backgroundColor: "LightGray",
											textTransform: "none",
											minWidth: 200,
											color: "black",
										}}
									>
										Cancel{" "}
									</Button>
									<Divider
										sx={{ height: "10px", width: 0 }}
									/>
									<Button
										onClick={handleSnackBarModalClose}
										type="submit"
										title={"Test"}
										variant="contained"
										color="secondary"
										sx={{
											borderRadius: 60,
											backgroundColor: "LightGray",
											textTransform: "none",
											minWidth: 200,
											color: "black",
										}}
									>
										Save
									</Button>
									<Divider
										sx={{ height: "15px", width: 0 }}
									/>
								</Box>
							</Box>
						</Modal>

						<Divider sx={{ height: "40px", width: 0 }} />

						{/*<Button variant = "contained" color="secondary" sx={ { borderRadius: 60, backgroundColor: 'LightGray', textTransform: 'none', minWidth:200, color:'black'}}> Export Report</Button> */}
					</Box>
					<div>
						<Snackbar
							sx={{ width: "70%" }}
							open={snackbaropen}
							autoHideDuration={2000}
							onClose={handleSnackBarClose}
							message={message}
							bodyStyle={{
								height: "auto",
								lineHeight: "28px",
								padding: 24,
								whiteSpace: "pre-line",
							}}
							action={action}
							ContentProps={{
								sx: {
									background: "LightGreen",
								},
							}}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
						>
							<Alert
								severity="success"
								sx={{ width: "100%" }}
								action={
									<Button
										color="inherit"
										size="large"
										onClick={handleSnackBarClose}
									>
										X
									</Button>
								}
							>
								<Typography>
									<strong>Successful</strong>{" "}
								</Typography>
								<br />
								Your report is saved successfully.
							</Alert>
						</Snackbar>
					</div>
				</Box>

				<Divider sx={{ height: "40px", width: 0 }} />

				<Box
					sx={{
						// mx: globalStyles.mx,
						display: "flex",
						alignItems: "center",
						height: "7vh",
						justifyContent: "space-between",
						backgroundColor: "black",
						width: "100%",
					}}
				>
					<Button
						type="submit"
						title={"Test"}
						color="secondary"
						sx={{
							textTransform: "none",
							minWidth: 200,
							color: "white",
							fontSize: 20,
						}}
					>
						Back{" "}
					</Button>
					<Box
						sx={{
							display: "flex",
							width: " 450px",
							justifyContent: "space-between",
						}}
					>
						<Button
							onClick={handleOpen}
							variant="contained"
							color="secondary"
							sx={{
								borderRadius: 60,
								backgroundColor: "LightGray",
								textTransform: "none",
								minWidth: 200,
								color: "black",
							}}
						>
							Save Report
						</Button>
						<Button
							variant="contained"
							color="secondary"
							sx={{
								borderRadius: 60,
								backgroundColor: "LightGray",
								textTransform: "none",
								minWidth: 200,
								color: "black",
							}}
						>
							{" "}
							Export Report
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

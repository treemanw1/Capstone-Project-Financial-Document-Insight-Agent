import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoundedDropdown from "./components/RoundedDropdown";
import {
	Box,
	Divider,
	Typography,
	FormControl,
	InputLabel,
	NativeSelect,
	Button,
	Grid,
} from "@mui/material";
import { globalStyles } from "./GlobalStyles";

export const ResultsPage = () => {
	return (
	  <Box
		sx={{
		  display: "flex",
		  flexDirection: "column",
		  minHeight: "100vh",
		  backgroundColor: ''
		}}
	  >
		<Header />
		<Box sx={{ display: "flex", mx: globalStyles.mx, backgroundColor: "", mt: "3vh", justifyContent: 'space-between'}}>
			<Box sx={{ width: "25%", backgroundColor: ""}}>
				{/* <RoundedDropdown
				label="Document Type"
				options={[
				{ value: "option1", label: "Option 1" },
				{ value: "option2", label: "Option 2" },
				{ value: "option3", label: "Option 3" },
				]}
				onChange={(event) => {
				console.log(event);
				}}
				/> */}
  
  			<FormControl variant="outlined" fullWidth>
				<InputLabel variant="standard" htmlFor="uncontrolled-native">
				Select document type
				</InputLabel>
				<NativeSelect
				defaultValue={1}
				inputProps={{
					name: "age",
					id: "uncontrolled-native",
				}}
				sx={{ borderRadius: "40px", height: "40px" }}
				>
				<option value={1}>Company Announcements</option>
				</NativeSelect>
		  	</FormControl>
			</Box>
			<Box sx={{ width: "65%", backgroundColor: ""}}>
				{/* <RoundedDropdown
				label="Document Type"
				options={[
				{ value: "option1", label: "Option 1" },
				{ value: "option2", label: "Option 2" },
				{ value: "option3", label: "Option 3" },
				]}
				onChange={(event) => {
				console.log(event);
				}}
				/> */}
  
  			<FormControl variant="outlined" fullWidth>
				<InputLabel variant="standard" htmlFor="uncontrolled-native">
				Search for keyword and/or phrases
				</InputLabel>
				<NativeSelect
				defaultValue={1}
				inputProps={{
					name: "age",
					id: "uncontrolled-native",
				}}
				sx={{ borderRadius: "40px", height: "40px" }}
				>
				<option value={1}>Dividend-in-specie</option>
				</NativeSelect>
		  	</FormControl>
			</Box>
			<Button type="submit" color="primary" sx={ { borderRadius: 15, backgroundColor: '' } }>Search</Button>
		</Box>
		<Box sx={{ mx: globalStyles.mx, backgroundColor: "", height: '50%' }}>
		  <Box sx={{mt: 5}}>
			<Typography lineHeight={1.1} sx={{ fontSize: "22px" }}>
			  Showing 30 documents
			</Typography>
		  </Box>
		</Box>
		<Box sx={{ mx: globalStyles.mx, backgroundColor: "", mt: 5 }}>
		<Grid container spacing={5}>
			<Grid item xs={2}>
				Company Name
			</Grid>
			<Grid item xs={2}>
				Document Title
			</Grid>
			<Grid item xs={2}>
				Date/Time
			</Grid>
			<Grid item xs={4}>
				Most Relevant Reference
			</Grid>
			<Grid item xs={2}>
				Total Relevances Found
			</Grid>
		</Grid>
		</Box>
		<Box sx={{ mx: globalStyles.mx, backgroundColor: "", mt: 5 }}>
		<Grid container spacing={5}>
			<Grid item xs={2}>
				ABC Holdings
			</Grid>
			<Grid item xs={2}>
				General Announcements
			</Grid>
			<Grid item xs={2}>
				21 Nov 2023 01:15PM
			</Grid>
			<Grid item xs={4}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</Grid>
			<Grid item xs={2}>
				30 references
			</Grid>
		</Grid>
		</Box>
		<Box sx={{ mx: globalStyles.mx, backgroundColor: "", flex: 1, mt: 3}}>
		<Grid container spacing={5}>
			<Grid item xs={2}>
				BBC Holdings
			</Grid>
			<Grid item xs={2}>
				General Announcements
			</Grid>
			<Grid item xs={2}>
				21 Nov 2023 01:15PM
			</Grid>
			<Grid item xs={4}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</Grid>
			<Grid item xs={2}>
				10 references
			</Grid>
		</Grid>
		</Box>
		<Footer />
	  </Box>
	);
  };

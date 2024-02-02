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
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'companyName', headerName: 'Company Name', width: 250 },
    { field: 'documentTitle', headerName: 'Document Title', width: 250 },
    { field: 'dateTime', headerName: 'Date/Time', width: 200 },
    { field: 'mostRelevantReference', headerName: 'Most Relevant Reference', width: 600 },
    { field: 'totalRelevancesFound', headerName: 'Total Relevances Found', width: 200 },
  ];
  

  const rows = [
    { id: 1, companyName: 'ABC Holdings', documentTitle: 'General Announcements', dateTime: '21 Nov 2023 01:15PM', mostRelevantReference: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', totalRelevancesFound: 30 },
    { id: 2, companyName: 'BBC Holdings', documentTitle: 'General Announcements', dateTime: '21 Nov 2023 01:15PM', mostRelevantReference: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', totalRelevancesFound: 10 },
    
  ];

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
		<Box sx={{ display: "flex", mx: globalStyles.mx, backgroundColor: "", mt: "4vh", justifyContent: 'space-between'}}>
			<Box sx={{ width: "25%", backgroundColor: ""}}>
  
  				<RoundedDropdown
                    label="Select Document Type"
                    options={[
                        { value: "option1", label: "Company Announcements" },
                        { value: "option2", label: "Annual Reports" },
                        { value: "option3", label: "General Announcements" },
                    ]}
                    onChange={(event) => {
                        console.log(event);
                    }}
                />
			</Box>
			<Box sx={{ width: "65%", backgroundColor: ""}}>
				<RoundedDropdown
                    label="Search for keyword and/or phrases"
                    options={[
                        { value: "option1", label: "Dividend-in-specie" },
                        { value: "option2", label: "2" },
                        { value: "option3", label: "3" },
                    ]}
                    onChange={(event) => {
                        console.log(event);
                    }}
                />
			</Box>
			<Button type="submit" color="primary" sx={ { borderRadius: 6, backgroundColor: 'lightgrey', color: 'black'} }>Search</Button>
		</Box>
		<Box sx={{ mx: globalStyles.mx, backgroundColor: "", height: '50%' }}>
		  <Box sx={{mt: 6}}>
			<Typography lineHeight={1.1} sx={{ fontSize: "22px" }}>
			  Showing 30 documents
			</Typography>
		  </Box>
		</Box>
		<Box sx={{ mx: globalStyles.mx, backgroundColor: "", mt: 5 }}>
		<DataGrid
            rows={rows}
            columns={columns}
			autoHeight
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            sortingMode="server" 
        />
		</Box>
		<Box
			sx={{
				position: 'fixed',
				bottom: 0,
				display: 'flex',
				alignItems: 'center',
				height: '7vh',
				justifyContent: 'space-between',
				backgroundColor: 'black',
				width: '100%',
				maxHeight: '100px',
			}}
>
    		<Box sx={{ mx: globalStyles.mx, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        		<Box sx={{ width: "400px" }}>
            		<Typography lineHeight={1.1} sx={{ fontSize: "18px", color: 'white' }}>
						0 documents selected
					</Typography>
        		</Box>
        		<Box sx={{ flex: 1, textAlign: 'right', marginRight: globalStyles.mx }}>
            	<Button variant="contained" color="primary" sx={{ borderRadius: 60, backgroundColor: 'LightGray', textTransform: 'none', minWidth: 200, color: 'black' }}> Next</Button>
        		</Box>
    		</Box>
		</Box>
		</Box>
	);
  };

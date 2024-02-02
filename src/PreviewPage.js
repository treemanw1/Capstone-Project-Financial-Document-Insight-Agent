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
    handleOpen,
} from "@mui/material";
import { globalStyles } from "./GlobalStyles";

const tableStyles = {
    borderCollapse: 'collapse',
    width: '100%',
  };
  
  const cellStyles = {
    border: '1px solid #ddd',
    padding: '20px',
    textAlign: 'left',
  };
  
  const headerCellStyles = {
    ...cellStyles,
    backgroundColor: '#f1f1f1',
    fontWeight: 'bold',
  };
  
  const tableData = [
    {
      number: "1",
      companyName: 'ABC Holdings',
      documentType: 'Company Announcements',
      dateTime: '21 Nov 2023 01:15 PM',
      pageNumber: 39,
      reference:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim dest.'
    },
    {
      number: "2",
      companyName: 'ABC Holdings',
      documentType: 'Company Announcements',
      dateTime: '21 Nov 2023 01:15 PM',
      pageNumber: 2,
      reference:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim dest.'
    },
    {
      number: "3",
      companyName: 'ABC Holdings',
      documentType: 'Company Announcements',
      dateTime: '21 Nov 2023 01:15 PM',
      pageNumber: 121,
      reference:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim dest.'
    }
  ];
  
  function Table() {
    return (
      <table style={tableStyles}>
        <thead>
          <tr>
            <td style={headerCellStyles}>No</td>
            <td style={headerCellStyles}>Company Name</td>
            <td style={headerCellStyles}>Document Title</td>
            <td style={headerCellStyles}>Date/Time</td>
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

export const PreviewPage = () => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true);
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
			<Typography lineHeight={1.1} sx={{ fontSize: "20px" }}>
			  <b>Report Preview</b>
			</Typography>
            <box>
            <Button disabled type="submit" color="primary" sx={ { borderRadius: 15, backgroundColor: '' } }>Delete Report</Button>
            <Button type="submit" color="primary" sx={ { borderRadius: 15, backgroundColor: '', color: 'black' } }>Enhance Report</Button>
            </box>
		</Box>
        <Box sx={{ mx: globalStyles.mx, backgroundColor: "", mt: 3 }}>
        <Typography lineHeight={1.1} sx={{ fontSize: "18px" }}>
			  1 document
			</Typography>
        </Box>
		<Box sx={{ mx: globalStyles.mx, backgroundColor: "", mt: 2 }}>
		<Grid container spacing={5}>
            <Grid item xs={12}>
                <Table />
            </Grid>
		</Grid>
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
            <Box sx={{ mx: globalStyles.mx, display: 'flex', justifyContent: 'space-between', width: '150%' }}>
        		<Box sx={{ width: "400px" }}>
                    <Button type="submit" title={'Test'} color="secondary" sx={{ textAlign:'start', textTransform: 'none', minWidth: 200, color: 'white', fontSize: 20 }}>Back</Button>
                </Box>
            <Box sx={{ flex: 1, textAlign: 'right', display: 'flex', justifyContent: 'flex-end'}}>

                <Box sx={{width:'45%',display:'flex', justifyContent: 'space-between'}}>
                <Button onClick={handleOpen} variant="contained" color="secondary"  sx={{ borderRadius: 60, backgroundColor: 'LightGray', textTransform: 'none', minWidth: 200, color: 'black'}}>Save Report</Button>
                <Button variant="contained" color="secondary" sx={{ borderRadius: 60, backgroundColor: 'LightGray', textTransform: 'none', minWidth: 200, color: 'black'}}>Export Report</Button>
                </Box>
            </Box>
            </Box>
            </Box>

        
	  </Box>
	);
  };

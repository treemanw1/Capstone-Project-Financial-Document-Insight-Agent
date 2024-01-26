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
    
} from "@mui/material";
import { globalStyles } from "./GlobalStyles";

export const AdvancedSearch = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<Header />
			<Box sx={{ mx: globalStyles.mx, backgroundColor: "", flex: 1 }}>
				<Box sx={{ width: "45%", mt: "3vh" }}>
					<Typography lineHeight={1.1} sx={{ fontSize: "20px" }}>
						Advanced Search
					</Typography>
					<Divider sx={{ height: "30px", width: 0 }} />
					<Typography sx={{ fontSize: "15px", width: "85%" }}>
						Document Type
					</Typography>
				</Box>
				
				<Box sx={{ display: "flex", mt: "20px", justifyContent: "space-between", width: "640px" }}>
					<Box>
					
					{ <RoundedDropdown
					headerText={'Select document type'}
					placeHolder={'Document Type'}
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						width={'300px'}
					/> }

					</Box>
					

					<Box>
					
					{ <RoundedDropdown
					headerText={'Select document sub-type'}
					placeHolder={'Document Sub-type'}
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						width={'300px'}
					/> }
					</Box>
		
				</Box>

				<Divider sx={{ height: "40px", width: 0 }} />
                <Typography sx={{ fontSize: "15px", width: "85%" }}>
						Date Range
				</Typography>
				<Divider sx={{ height: "5px", width: 0 }} />
				
				<Box sx={{ display: "flex", mt: "20px", justifyContent: "space-between", width: "950px" }}>
					<Box>
					
					{ <RoundedDropdown
					headerText={'Select date type'}
					placeHolder={'Date Type'}
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						width={'300px'}
					/> }

					</Box>
					

					<Box>
					
					{ <RoundedDropdown
					headerText={'Select start date'}
					placeHolder={'Start Date'}
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						width={'300px'}
					/> }
					</Box>

					<Box>
					
					{ <RoundedDropdown
					headerText={'Select end date'}
					placeHolder={'End Date'}
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						width={'300px'}
					/> }
					</Box>
		
		
				</Box>
                <Box>
                <Divider sx={{ height: "30px", width: 0 }} />
                <Typography sx={{ fontSize: "15px", width: "85%" }}>
						Status
				</Typography> 
				<Divider sx={{ height: "10px", width: 0 }} />
				
				{ <RoundedDropdown
					headerText={'Select Status'}
					placeHolder={'Status'}
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						width={'250px'}
					/> }
                </Box>
                <Box>
                <Divider sx={{ height: "30px", width: 0 }} />
                <Typography sx={{ fontSize: "15px", width: "85%" }}>
						Search Keywords and/or Phrases
				</Typography> 
                </Box>
				<Divider sx={{ height: "15px", width: 0 }} />
				
                <Box>
				<Box sx={{ display: "flex", mt: "20px", justifyContent: "space-between", width: "950px"}}>
					<Box>
					
					{ <RoundedDropdown
					headerText={'Select keyword'}
					placeHolder={'Type Keywords'}
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						width={'600px'}
					/> }

					</Box>
					

					<Box>
					
					{ <RoundedDropdown
					headerText={'Where keyword is found'}
					placeHolder={'Please select '}
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						width={'300px'}
					/> }
					</Box>
		
				</Box>
				<Divider sx={{ height: "5px", width: 0 }} />
				<Box sx={{ display: "flex", mt: "20px", justifyContent: "space-between", width: "950px"}}>
					<Box>
					
					{ <RoundedDropdown
					headerText={'Select Phrases'}
					placeHolder={'Type Phrases'}
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						width={'600px'}
					/> }

					</Box>
					

					<Box>
					
					{ <RoundedDropdown
					headerText={'Where phrases is found'}
					placeHolder={'Please select '}
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						width={'300px'}
					/> }
					</Box>
		
				</Box>
				
                <Divider sx={{ height: "70px", width: 0 }} />
                <Button type="submit" title={'Test'}  variant = "contained" color="secondary" sx={ { borderRadius: 60, backgroundColor: 'silver', textTransform: 'none', minWidth:200, color:'black'} } >Search </Button>
                </Box>
			</Box>
			<Footer />
		</Box>
	);
};

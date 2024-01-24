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
				
				<Box sx={{ display: "flex", mt: "20px", backgroundColor: 'pink', justifyContent: "space-between" }}>
					<Box>
					<Typography lineHeight={1.1} sx ={{fontSize:"12px"}}>
					Select Document Type	
					</Typography>
					< Divider sx = {{height: " 10px",width : 0}} />
					{ <RoundedDropdown
						label="Document Type"
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						onChange={(event) => {
							console.log(event);
						}}
					/> }

					</Box>
					

					<Box>
					<Typography lineHeight={1.1} sx ={{fontSize:"12px"}}>
					Select Document sub-type	
					</Typography>
					< Divider sx = {{height: " 10px",width : 0}} />
					{ <RoundedDropdown
						label="Document Sub-type"
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						onChange={(event) => {
							console.log(event);
						}}
					/> }
					</Box>
					
					
					{/*{ <RoundedDropdown
						label="Document Type"
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						onChange={(event) => {
							console.log(event);
						}}
					/> }
					< Divider sx = {{height: " 20px",width : 0}} />
					
					< Divider sx = {{height: " 10px",width : 0}} />
					{ <RoundedDropdown
						label="Document Sub-type"
						options={[
							{ value: "option1", label: "Option 1" },
							{ value: "option2", label: "Option 2" },
							{ value: "option3", label: "Option 3" },
						]}
						onChange={(event) => {
							console.log(event);
						}}
					/> }*/}
                    
                    
            
                    
           
                    <box>

                    {/*<FormControl variant="outlined" fullWidth>
						<InputLabel
							variant="standard"
							htmlFor="uncontrolled-native"
						>
							Select document type
						</InputLabel>
						<NativeSelect
							defaultValue={1}  
							inputProps={{
								name: "age",
								id: "uncontrolled-native",
							}}
							sx={{ borderRadius: "20px", height: "20px" }}
						>
							<option value={1}>Document Type</option>
						</NativeSelect>
						</FormControl>*/}

                    </box>
					
                    <Divider sx={{ height: "50px", width: 0 }} />
				</Box>

				
                <Typography sx={{ fontSize: "15px", width: "85%" }}>
						Date Range
				</Typography>
				<Divider sx={{ height: "20px", width: 0 }} />
				# Insert dropdown for select date type, select starte date & select end date
                <Box>
                <Divider sx={{ height: "60px", width: 0 }} />
                <Typography sx={{ fontSize: "15px", width: "85%" }}>
						Status
				</Typography> 
				<Divider sx={{ height: "30px", width: 0 }} />
				# Insert dropdown for Select Status
                </Box>
                <Box>
                <Divider sx={{ height: "50px", width: 0 }} />
                <Typography sx={{ fontSize: "15px", width: "85%" }}>
						Search Keywords and/or Phrases
				</Typography> 
                </Box>
				<Divider sx={{ height: "20px", width: 0 }} />
				#Insert search bar for keyword and/or phrases 
                <Box>
                <Divider sx={{ height: "70px", width: 0 }} />
                <Button type="submit" title={'Test'}  variant = "contained" color="secondary" sx={ { borderRadius: 60, backgroundColor: 'silver', textTransform: 'none', minWidth:200, color:'black'} } >Search </Button>
                </Box>
			</Box>
			<Footer />
		</Box>
	);
};

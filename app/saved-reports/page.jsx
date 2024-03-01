"use client";

import React from "react";
import { useState } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import RoundedDropdown from "@components/RoundedDropdown";
import SearchField from "@components/SearchField";
import DateDropdown from "@components/DateDropdown";
import RoundButton from "@components/RoundButton";
import {
    Box,
    Typography,
    Button,
} from "@mui/material";
import { globalStyles } from "@components/GlobalStyles";

import { DataGrid } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";



const styles = {
    fontSize: "1.5vh",
    barWidth: 36, // vh
    barHeight: "7.5vh",
};

const columns = [
    { field: "reportName", headerName: "Report Name", width: 500 },
    {
        field: "reportDescription",
        headerName: "Report Description",
        width: 350,
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
        reportName: "ABC Holdings Reference for Project A",
        reportDescription: "Financial statements",
        noOfDocuments: 12,
        lastSaved: "21 Nov 2023",
    },
    {
        id: 3,
        reportName: "ABC Holdings Reference for Project A",
        reportDescription: "Financial statements",
        noOfDocuments: 11,
        lastSaved: "21 Nov 2023",
    },
    {
        id: 4,
        reportName: "ABC Holdings Reference for Project A",
        reportDescription: "Director conflict of interest",
        noOfDocuments: 33,
        lastSaved: "21 Nov 2023",
    },
    {
        id: 5,
        reportName: "ABC Holdings Reference for Project A",
        reportDescription: "General Announcements",
        noOfDocuments: 45,
        lastSaved: "21 Nov 2023",
    },
    {
        id: 6,
        reportName: "ABC Holdings Reference for Project A",
        reportDescription: "Financial statements",
        noOfDocuments: 23,
        lastSaved: "21 Nov 2023",
    },
    {
        id: 7,
        reportName: "ABC Holdings Reference for Project A",
        reportDescription: "General Announcements",
        noOfDocuments: 5,
        lastSaved: "21 Nov 2023",
    },
];

export const SavedReports = () => {
    const [startDate, setStartDate] = useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    <Box>
                        <Typography
                            lineHeight={1.1}
                            sx={{
                                mt: "30px",
                                fontSize: "3vh",
                                background: "",
                            }}
                        >
                            Saved Reports
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        mx: globalStyles.mx,
                        backgroundColor: "",
                        mt: "10px",
                        gap: 2,
                        justifyContent: "stretch",
                    }}
                >
                    <RoundedDropdown
                        placeHolder={"Document Type"}
                        options={[
                            "Company Announcements",
                            "General Announcements",
                            "Financial Statements",
                        ]}
                        fontSize={styles.fontSize}
                        height={styles.barHeight}
                        width="25%"
                        onChange={(event) => {
                            console.log(event);
                        }}
                    />

                    <DateDropdown
                        width="30%"
                        props={{
                            label: "Date Range",
                            date: startDate,
                            onChange: (d) => setStartDate(d),

                            height: styles.barHeight,
                            mt: "-3px",
                            fontSize: styles.fontSize,
                        }}
                    />

                    <SearchField
                        props={{
                            fontSize: styles.fontSize,
                            width: "50%",
                            height: styles.barHeight,
                        }}
                    />
                    <Box
                        sx={{
                            backgroundColor: "",
                            width: "15%",
                            display: "flex",

                            alignItems: "end",
                        }}
                    >
                        <RoundButton
                            props={{
                                text: "Search",

                                height: "5.2vh",
                                width: "20vh",
                                fontSize: "1.75vh",
                            }}
                        />
                    </Box>
                </Box>

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
                        rowHeight={70}
                    />
                </Box>
                <Box sx={{ bottom: 0, backgroundColor: "" }}>
                    <Footer />
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default SavedReports;

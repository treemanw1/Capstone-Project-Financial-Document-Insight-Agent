"use client";

import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { globalStyles } from "@components/GlobalStyles";
import {
    Box,
    Typography,
    Divider,
    Button,
    Modal,
    FormControlLabel,
    TextField,
    Checkbox,
    Snackbar,
    Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RoundedDropdown from "@components/RoundedDropdown";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    height: "55",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
};

export const ReportPreview = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const handleOpenSnackBar = () => setOpenSnackBar(true);
    const handleCloseSnackBar = () => setOpenSnackBar(false);
    const handleSnackBarCloseModal = () => {
        handleOpenSnackBar();
        handleCloseModal();
    };
    const rows = [
        {
            id: 1,
            companyName: "ABC Holdings",
            documentType: "Company Announcements",
            dateTime: "21 Nov 2023 01:15 PM",
            pageNumber: "Page 39",
            reference:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim dest.",
        },
        {
            id: 2,
            companyName: "ABC Holdings",
            documentType: "Company Announcements",
            dateTime: "21 Nov 2023 01:15 PM",
            pageNumber: "Page 2",
            reference:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim dest.",
        },
        {
            id: 3,
            companyName: "ABC Holdings",
            documentType: "Company Announcements",
            dateTime: "21 Nov 2023 01:15 PM",
            pageNumber: "Page 121",
            reference:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim dest.",
        },
    ];
    const columns = [
        { field: "id", headerName: "No.", width: 20 },
        {
            field: "companyName",
            headerName: "Company Name",
            width: 200,
        },
        {
            field: "documentType",
            headerName: "Document Type / Document Title",
            width: 280,
        },
        {
            field: "dateTime",
            headerName: "Date / Time",
            width: 150,
        },
        {
            field: "pageNumber",
            headerName: "Page Number",
            width: 150,
            align: "left",
        },
        {
            field: "reference",
            headerName: "Reference",
            width: "fit-content",
            flex: 1,
        },
    ];

    const action = (
        <React.Fragment>
            <Button color="primary" size="small" onClick={handleCloseSnackBar}>
                X
            </Button>
        </React.Fragment>
    );

    const message = "First line  Second Line";

    return (
        <Box sx={{ backgroundColor: "", height: "100vh" }}>
            <Header />
            <Box
                sx={{
                    mx: globalStyles.mx,
                    backgroundColor: "",
                    height: `${100 -
                        globalStyles.footerHeight -
                        globalStyles.headerHeight
                        }vh`,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "",

                        mt: "2vh",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography sx={{ fontSize: "20px" }}>
                        Report Preview
                    </Typography>
                    {/*  */}
                    <Box>
                        <Button
                            sx={{
                                textTransform: "None",
                                color: "black",
                                fontSize: "16px",
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
                            }}
                        >
                            {" "}
                            Enhance Report
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ height: "vh", width: 0 }} />
                <Typography sx={{ backgroundColor: "" }}>1 Document</Typography>
                <div>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        showCellVerticalBorder
                        showColumnVerticalBorder
                        hideFooterSelectedRowCount
                        hideFooter
                        getRowHeight={() => "auto"}
                        sx={{
                            fontSize: "16px",
                        }}
                    />
                </div>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "black",
                    height: "8vh",
                    px: globalStyles.mx,
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
                        fontSize: 18,
                        "&:hover": {
                            backgroundColor: "#B5B5B5",
                            color: "white",
                        },
                    }}
                >
                    Back{" "}
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        mx: 100 % -globalStyles.mx,
                        justifyContent: "space-between",
                        width: "400px",
                    }}
                >
                    <Button
                        onClick={handleOpenModal}
                        variant="contained"
                        color="secondary"
                        sx={{
                            borderRadius: 60,
                            backgroundColor: "LightGray",
                            textTransform: "none",
                            minWidth: 190,
                            color: "black",
                            "&:hover": {
                                backgroundColor: "#B5B5B5",
                                color: "white",
                            },
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
                            minWidth: 190,
                            color: "black",
                            "&:hover": {
                                backgroundColor: "#B5B5B5",
                                color: "white",
                            },
                        }}
                    >
                        {" "}
                        Export Report
                    </Button>

                    <div>
                        <Modal
                            open={openModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1,
                                        background: "",
                                        height: "5%",
                                    }}
                                >
                                    <Box sx={{ width: "80px" }} />
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        align="center"
                                    >
                                        Save Report
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            width: "80px",
                                            background: "",
                                        }}
                                    >
                                        <Button
                                            onClick={handleCloseModal}
                                            sx={{
                                                color: "black",
                                                fontSize: "20px",
                                            }}
                                            align="center"
                                        >
                                            {" "}
                                            X{" "}
                                        </Button>
                                    </Box>
                                </Box>
                                {/*<box sx={{ display: "flex" }}>
									<Typography
										id="modal-modal-title"
										variant="subtitle1"
										component="h2"
										align="center"
										mt={-2}
									>
										Save Report
									</Typography>

									{/*<Button
										onClick={handleCloseModal}
										sx={{ color: "black" }}
										align="center"
									>
										{" "}
										X{" "}
					</Button>
					</box>*/}
                                <Divider
                                    sx={{
                                        borderBottomWidth: 1.5,
                                        width: "100%",
                                    }}
                                    style={{ background: "black" }}
                                />
                                <Box>
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2 }}
                                    >
                                        How do you want to save your report?
                                    </Typography>
                                    <Divider
                                        sx={{ height: "15px", width: 0 }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Save as new report"
                                    />
                                    <Divider
                                        sx={{ height: "15px", width: 0 }}
                                    />
                                    <TextField
                                        id="outlined-helperText"
                                        defaultValue="Report Name"
                                        helperText="Characters allowed: letters, numbers and _."
                                        size="small"
                                        sx={{ width: "90%" }}
                                    />
                                    <Divider
                                        sx={{ height: "25px", width: 0 }}
                                    />
                                    <TextField
                                        id="outlined-helperText"
                                        label=""
                                        defaultValue="Report Description(optional)"
                                        helperText="Characters allowed: letters, numbers and _."
                                        size="small"
                                        sx={{ width: "90%" }}
                                    />
                                    <Divider
                                        sx={{ height: "30px", width: 0 }}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="Save and add to existing report"
                                    />
                                    <Divider sx={{ height: "5px", width: 0 }} />
                                    <RoundedDropdown
                                        headerText={""}
                                        placeHolder={"Select report"}
                                        options={[
                                            "Report 1",
                                            "Report 2",
                                            "Report 3",
                                        ]}
                                        width={"700px"}
                                    />
                                    <Divider
                                        sx={{ height: "25px", width: 0 }}
                                    />

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            width: "100%",

                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                width: "57%",
                                            }}
                                        >
                                            <Button
                                                onClick={handleCloseModal}
                                                variant="contained"
                                                color="secondary"
                                                sx={{
                                                    borderRadius: 60,
                                                    backgroundColor:
                                                        "LightGray",
                                                    textTransform: "none",
                                                    minWidth: 200,
                                                    color: "black",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#B5B5B5",
                                                        color: "white",
                                                    },
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={
                                                    handleSnackBarCloseModal
                                                }
                                                type="submit"
                                                title={"Test"}
                                                variant="contained"
                                                color="secondary"
                                                sx={{
                                                    borderRadius: 60,
                                                    backgroundColor:
                                                        "LightGray",
                                                    textTransform: "none",
                                                    minWidth: 200,
                                                    color: "black",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#B5B5B5",
                                                        color: "white",
                                                    },
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Modal>
                    </div>
                    <div>
                        <Snackbar
                            sx={{ width: "70%" }}
                            open={openSnackBar}
                            autoHideDuration={2000}
                            onClose={handleCloseSnackBar}
                            action={action}
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
                                        onClick={handleCloseSnackBar}
                                    >
                                        X
                                    </Button>
                                }
                            >
                                <Typography>
                                    <strong>Successful</strong>{" "}
                                </Typography>
                                Your report is saved successfully.
                            </Alert>
                        </Snackbar>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default ReportPreview;

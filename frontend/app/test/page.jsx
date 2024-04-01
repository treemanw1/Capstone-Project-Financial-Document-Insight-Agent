'use client'

import React from "react";
import {
    Chip,
    Box,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";

export default function App() {
    const dummyMenuItems = [
        {
            title: "Add Item",
        },
        {
            title: "Move Item",
        },
        {
            title: "Delete Item",
        },
    ];
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const nativeOnChange = (e) => {
        const detail = {
            selectedIndex: e.target.selectedIndex,
        };
        e.target.selectedIndex = 0;

        e.target.dispatchEvent(new CustomEvent("itemClick", { detail }));
    };
    const itemClick = (e) => {
        console.log("Item Clicked " + e.detail);
    };
    return (
        <>
            <h1>Material UI Icon Menu</h1>
            <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                aria-label="Open to show more"
                title="Open to show more"
                sx={{ background: 'pink' }}
            >
                {/* <MoreHorizIcon /> */}
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {dummyMenuItems.map((item) => (
                    <MenuItem
                        onClick={handleClose}
                        key={item.title}
                        value={item.title}
                    >
                        {item.title}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

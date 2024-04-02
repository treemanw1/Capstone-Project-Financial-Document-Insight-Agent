import React from "react";
import {
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from "@mui/material";
import { Session } from "interfaces";
import { useTheme } from "@mui/material/styles";
import { MoreHoriz } from "@mui/icons-material";

import { get } from "utils/rest_utils";

import style from "../../layout.module.css";

interface MyComponentProps {
	currentSessionId: number | null;
	session: Session;
	onClick: (id: number) => void;
	buttonPx?: number;
}

const SessionButton: React.FC<MyComponentProps> = ({
	currentSessionId,
	session,
	onClick,
	buttonPx = 1,
}) => {
	const theme = useTheme();

	const token =
		typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

	const menuItems = [
		// {
		// 	title: "Rename Session",
		// },
		{
			title: "Delete Session",
		},
	];

	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const handleMoreOptions = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = (session_id: number) => {
		get(
			token,
			`/delete-session/${session_id}`,
			"Failed to delete session.",
			(status) => {
				if (status) {
					console.log("Session deletion successful.");
				}
			}
		);
		window.location.reload();
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
				borderRadius: 2,
				transition: ".1s",
				"&:hover": { background: "#D9D9D9" },
				background: session.id == currentSessionId ? "#D9D9D9" : "",
			}}
		>
			<Button
				disableRipple
				key={session.id}
				sx={{
					textAlign: "left",
					height: "5vh",
					textTransform: "none",
					color: theme.palette.text.primary,
					// background:
					// 	currentSessionId == session.id
					// 		? theme.palette.primary.dark
					// 		: "transparent",
					// background: "pink",
					width: "100%",
					justifyContent: "flex-start",
					"&:hover": {
						// background: theme.palette.primary.dark,
						color: "black",
					},
					py: 0.5,
					px: buttonPx,
				}}
				onClick={() => {
					onClick(session.id);
				}}
			>
				<Typography
					className={style.font}
					variant="body1"
					textAlign="left"
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						// fontSize: 15,
						color: "black",
					}}
				>
					{session.name}
				</Typography>
			</Button>
			{session.id == currentSessionId ? (
				<>
					<IconButton
						sx={{
							transition: ".1s",
							"&:hover": { color: "black" },
						}}
						disableRipple
						size="small"
						onClick={handleMoreOptions}
					>
						<MoreHoriz sx={{ fontSize: 20 }} />
					</IconButton>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						{menuItems.map((item) => (
							<MenuItem
								sx={{ fontSize: "small" }}
								onClick={() => handleDelete(session.id)}
								key={item.title}
								value={item.title}
							>
								{item.title}
							</MenuItem>
						))}
					</Menu>
				</>
			) : (
				<></>
			)}
		</Box>
	);
};

export default SessionButton;

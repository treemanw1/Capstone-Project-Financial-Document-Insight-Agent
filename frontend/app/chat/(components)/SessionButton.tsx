import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Session } from "interfaces";
import { useTheme } from "@mui/material/styles";

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

	return (
		<Button
			key={session.id}
			sx={{
				textAlign: "left",
				height: "5vh",
				textTransform: "none",
				color: theme.palette.text.primary,
				background:
					currentSessionId == session.id
						? theme.palette.primary.dark
						: "transparent",
				justifyContent: "flex-start",
				"&:hover": {
					background: theme.palette.primary.dark,
				},
				py: 0.5,
				px: buttonPx,
			}}
			onClick={() => {
				onClick(session.id);
			}}
		>
			<Typography
				variant="body2"
				textAlign="left"
				style={{
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					// fontSize: 15,
				}}
			>
				{session.name}
			</Typography>
		</Button>
	);
};

export default SessionButton;

import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { globalStyles, fontStyles, lightStyles, darkStyles } from "styles";
import { Session, SessionDisplay } from "interfaces";
import { useRouter } from "next/navigation";
import SessionButton from "./SessionButton";
import { useTheme } from "@mui/material/styles";

import {
	isToday,
	isYesterday,
	withinLastWeek,
	withinLastMonth,
} from "utils/date_utils";

interface MyComponentProps {
	currentSessionId: number | null;
	sessions: Session[];
	onClickSession: (id: number) => void;
}

const styles = {
	outsideButtonPx: 1,
	insideButtonPx: 1,
};

const Sessions: React.FC<MyComponentProps> = ({
	currentSessionId,
	sessions,
	onClickSession,
}) => {
	const theme = useTheme();
	const router = useRouter();

	const [sessionDisplay, setSessionDisplay] = useState<SessionDisplay>({
		today: [],
		yesterday: [],
		lastWeek: [],
		lastMonth: [],
		lastYear: [],
	});

	useEffect(() => {
		setSessionDisplay(createSessionDisplay(sessions));
	}, [sessions]);

	const createSessionDisplay = (sessions: Session[]): SessionDisplay => {
		const newSessions = [...sessions];
		const newSessionDisplay: SessionDisplay = {
			today: [],
			yesterday: [],
			lastWeek: [],
			lastMonth: [],
			lastYear: [],
		};
		newSessions.forEach((session) => {
			const sessionInfo = {
				id: session.id,
				created_at: session.created_at,
				name: session.name,
			};
			if (isToday(new Date(session.created_at))) {
				newSessionDisplay.today.push(sessionInfo);
			} else if (isYesterday(new Date(session.created_at))) {
				newSessionDisplay.yesterday.push(sessionInfo);
			} else if (withinLastWeek(new Date(session.created_at))) {
				newSessionDisplay.lastWeek.push(sessionInfo);
			} else if (withinLastMonth(new Date(session.created_at))) {
				newSessionDisplay.lastMonth.push(sessionInfo);
			} else {
				newSessionDisplay.lastYear.push(sessionInfo);
			}
		});
		return newSessionDisplay;
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				width: "100%",
				background: theme.palette.primary.light,
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					height: globalStyles.headerHeight,
					borderColor: theme.palette.text.primary,
					px: styles.outsideButtonPx,
				}}
			>
				<Button
					sx={{
						height: "5vh",
						textTransform: "none",
						background: "transparent",
						justifyContent: "flex-start",
						color: theme.palette.text.primary,
						"&:hover": {
							backgroundColor: theme.palette.primary.dark,
						},
						py: 0.5,
						px: styles.insideButtonPx,
						width: "100%",
					}}
					onClick={() => {
						router.push("/filter");
					}}
				>
					<Typography
						variant="body2"
						style={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						Back to filter
					</Typography>
				</Button>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					// background: "pink",
					px: styles.outsideButtonPx,
					gap: 0.5,
					height: `calc(100% - ${globalStyles.headerHeight})`,
					borderColor: theme.palette.text.primary,
				}}
			>
				{sessionDisplay.today.length > 0 ? (
					<>
						<Typography
							variant="caption"
							sx={{
								color: theme.palette.text.primary,
								px: styles.outsideButtonPx,
								pt: 1.5,
							}}
						>
							Today
						</Typography>
						{sessionDisplay.today.map((session) => {
							return (
								<SessionButton
									key={session.id}
									currentSessionId={currentSessionId}
									session={session}
									onClick={(id) => onClickSession(id)}
									buttonPx={styles.insideButtonPx}
								/>
							);
						})}
					</>
				) : (
					<></>
				)}
				{sessionDisplay.yesterday.length > 0 ? (
					<>
						<Typography
							variant="caption"
							sx={{
								color: theme.palette.text.primary,
								px: styles.outsideButtonPx,
								pt: 1.5,
							}}
						>
							Yesterday
						</Typography>
						{sessionDisplay.yesterday.map((session) => {
							return (
								<SessionButton
									key={session.id}
									currentSessionId={currentSessionId}
									session={session}
									onClick={(id) => onClickSession(id)}
									buttonPx={styles.insideButtonPx}
								/>
							);
						})}
					</>
				) : (
					<></>
				)}
				{sessionDisplay.lastWeek.length > 0 ? (
					<>
						<Typography
							variant="caption"
							sx={{
								color: theme.palette.text.primary,
								px: styles.outsideButtonPx,
								pt: 1.5,
							}}
						>
							Last Week
						</Typography>
						{sessionDisplay.lastWeek.map((session) => {
							return (
								<SessionButton
									key={session.id}
									currentSessionId={currentSessionId}
									session={session}
									onClick={(id) => onClickSession(id)}
									buttonPx={styles.insideButtonPx}
								/>
							);
						})}
					</>
				) : (
					<></>
				)}
				{sessionDisplay.lastMonth.length > 0 ? (
					<>
						<Typography
							variant="caption"
							sx={{
								color: theme.palette.text.primary,
								px: styles.outsideButtonPx,
								pt: 1.5,
							}}
						>
							Last Month
						</Typography>
						{sessionDisplay.lastMonth.map((session) => {
							return (
								<SessionButton
									key={session.id}
									currentSessionId={currentSessionId}
									session={session}
									onClick={(id) => onClickSession(id)}
									buttonPx={styles.insideButtonPx}
								/>
							);
						})}
					</>
				) : (
					<></>
				)}
				{sessionDisplay.lastYear.length > 0 ? (
					<>
						<Typography
							variant="caption"
							sx={{
								color: theme.palette.text.primary,
								px: styles.outsideButtonPx,
								pt: 1.5,
							}}
						>
							Last Year
						</Typography>
						{sessionDisplay.lastYear.map((session) => {
							return (
								<SessionButton
									key={session.id}
									currentSessionId={currentSessionId}
									session={session}
									onClick={(id) => onClickSession(id)}
									buttonPx={styles.insideButtonPx}
								/>
							);
						})}
					</>
				) : (
					<></>
				)}
			</Box>
		</Box>
	);
};

export default Sessions;

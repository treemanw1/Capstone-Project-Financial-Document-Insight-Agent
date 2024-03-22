"use client";

import React, { useState } from "react";
import { Box, Button, Input, TextField, Typography, Link } from "@mui/material";

import { useRouter } from "next/navigation";
import NextLink from "next/link";

const Login = () => {
	const router = useRouter();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const onLogin = async () => {
		const formData = new FormData();
		formData.append("username", username);
		formData.append("password", password);
		try {
			const response = await fetch(`http://localhost:8000/token`, {
				method: "POST",
				body: formData,
			});
			if (!response.ok) {
				throw new Error("Failed to fetch response.");
			} else {
				const data = await response.json();
				localStorage.setItem("jwtToken", data.access_token);
				router.push("/filter");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Typography variant="h3" fontWeight="bold">
				Login
			</Typography>
			<Box
				sx={{
					p: 2,
					background: "white",
					display: "flex",
					flexDirection: "column",
					// justifyContent: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 1,
					}}
				>
					<Typography sx={{ width: "50%" }}>Username: </Typography>
					<TextField
						InputLabelProps={{ shrink: false }}
						size="small"
						id="username"
						label={username == "" ? "Username" : ""}
						variant="outlined"
						value={username}
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 1,
					}}
				>
					<Typography sx={{ width: "50%" }}>Password: </Typography>
					<TextField
						InputLabelProps={{ shrink: false }}
						size="small"
						id="username"
						label={password == "" ? "Password" : ""}
						variant="outlined"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								onLogin();
							}
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 1,
						// background: "pink",
						mt: 1,
					}}
				>
					<Link
						component={NextLink}
						href="/create-account"
						underline="hover"
						color="black"
						variant="body1"
						width="50%"
					>
						Create Account
					</Link>
					<Button
						onClick={() => onLogin()}
						sx={{
							color: "white",
							background: "#3C3C3C",
							textTransform: "none",
							"&:hover": {
								backgroundColor: "#666666",
							},
						}}
					>
						Login
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;

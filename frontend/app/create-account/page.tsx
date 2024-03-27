"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useRouter } from "next/navigation";

const CreateAccount = () => {
	const router = useRouter();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const onCreateAccount = async () => {
		if (password !== confirmPassword) {
			console.error("Passwords do not match");
			return;
		}
		try {
			const response = await fetch(
				"http://13.213.71.123/8000/create-user",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: username,
						password: password,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to create account");
			} else {
				const data = await response.json();
				setUsername("");
				setPassword("");
				setConfirmPassword("");
				router.push("/login");
			}
		} catch (error) {
			console.error("Error creating account:", error);
		}
	};
	return (
		<Box sx={{ p: 2 }}>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<Typography sx={{ width: "10%" }}>Username: </Typography>
				<TextField
					size="small"
					id="username"
					label="Username"
					variant="outlined"
					value={username}
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<Typography sx={{ width: "10%" }}>Password: </Typography>
				<TextField
					size="small"
					id="username"
					label="Password"
					variant="outlined"
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<Typography sx={{ width: "10%" }}>
					Confirm Password:{" "}
				</Typography>
				<TextField
					size="small"
					id="username"
					label="Password"
					variant="outlined"
					value={confirmPassword}
					onChange={(event) => {
						setConfirmPassword(event.target.value);
					}}
				/>
			</Box>
			<Button
				onClick={() => onCreateAccount()}
				sx={{ color: "white", background: "#3C3C3C", mt: 2 }}
			>
				Create Account
			</Button>
		</Box>
	);
};

export default CreateAccount;

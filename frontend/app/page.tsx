"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";

import { useRouter } from "next/navigation";
import NextLink from "next/link";

import { post } from "utils";

const Login = () => {
	const router = useRouter();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const onLogin = async () => {
		post({ username: username, password: password }, "/login", (data) => {
			setUsername("");
			setPassword("");
			router.push("/home");
		});
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
				<Link
					component={NextLink}
					href="/create-account"
					underline="hover"
					color="black"
					variant="body1"
					sx={{ width: "10%" }}
				>
					Create Account
				</Link>
				<Button
					onClick={() => onLogin()}
					sx={{ color: "white", background: "#3C3C3C", mt: 2 }}
				>
					Login
				</Button>
			</Box>
		</Box>
	);
};

export default Login;

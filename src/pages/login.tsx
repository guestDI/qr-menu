import type { NextPage } from "next";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { Button, Input } from "../components";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api/axios";
import { CustomEvent } from "../model/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login: NextPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const onUsernameChanged = (e: CustomEvent) => {
		setUsername(e.target.value);
	};

	const onPasswordChanged = (e: CustomEvent) => {
		setPassword(e.target.value);
	};

	const login = async (e: FormEvent) => {
		e.preventDefault();

		const data = {
			username,
			password,
		};

		try {
			const response = await axiosInstance.post("/users/login", data);
			Cookies.set("authToken", response.data.token);
			router.push("/admin");
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error: unknown) {
			console.log("error", error);
			toast("An unexpected error occurred");
		}
	};

	return (
		<div className="login-container">
			<div className="header">
				<div className="logo">
					<Image src="/logo_2.png" alt="Logo" width={60} height={60} />
				</div>
				<span>Digital menu</span>
				<div className="header-menu">
					<Link href="/">Home</Link>
				</div>
				<div className="header-menu">
					<Link href="/">Our mission</Link>
				</div>
			</div>
			<div className="left-container">
				<div className="form-group">
					<p>WELCOME BACK</p>
					<h1 className="title">Sign In</h1>
					<div className="login-box">
						{/*change to react hook form*/}
						<p>
							Forgot your password?{" "}
							<Link href="/resetPassword">Reset password</Link>
						</p>
						<form onSubmit={login}>
							<div className="row-input">
								<Input
									name="username"
									type="text"
									placeholder="Username"
									size="lg"
									onChange={onUsernameChanged}
								/>
							</div>
							<div>
								<div className="input-group">
									<Input
										name="password"
										type="password"
										placeholder="Password"
										size="lg"
										onChange={onPasswordChanged}
									/>
								</div>
							</div>
							<ToastContainer
								theme="dark"
								autoClose={3000}
								position="bottom-right"
							/>
							<Button type="submit" className="login-button">
								Log In
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
